import { TimeLineForm, TimeLineFormState } from 'components/TimeLineForm';
import { TimeLineUpdateModalContent } from 'components/TimeLineUpdateModalContent';
import { Button } from 'components/UI';
import { Loader } from 'components/UI';
import { Modal } from 'components/UI';
import { Component, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { timeLineDataObserver } from 'services/Observer';
import { ChartDataType, NoProps } from 'types';
import { generateRandomCurrencyHistoryData } from 'utils';

import * as styles from './styles.module.css';

const Chart = lazy(() => import('components/Chart').then((module) => ({ default: module['Chart'] })));

interface TimeLineState {
  chartData: ChartDataType[];
  showModal: boolean;
}

export class TimeLine extends Component<NoProps, TimeLineState> {
  constructor(props: NoProps) {
    super(props);
    this.state = {
      chartData: [],
      showModal: false,
    };
  }

  componentDidMount(): void {
    timeLineDataObserver.subscribe(this.updateDayData);
  }

  componentWillUnmount(): void {
    timeLineDataObserver.unsubscribe(this.updateDayData);
  }

  updateDayData = (newData: ChartDataType) => {
    this.setState((prev) => ({
      chartData: prev.chartData.map((data) => {
        if (data.x === newData.x) {
          return newData;
        }
        return data;
      }),
    }));
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  submitHandler = (formState: TimeLineFormState) => {
    this.setState({ chartData: generateRandomCurrencyHistoryData(new Date(formState.startDate)) });
  };

  render() {
    return (
      <>
        <div className={styles.wrapper}>
          <TimeLineForm submitHandler={this.submitHandler} />
          <Button onClick={this.openModal} disabled={this.state.chartData.length === 0}>
            Update
          </Button>

          {this.state.showModal &&
            createPortal(
              <Modal onClose={this.closeModal}>
                <TimeLineUpdateModalContent data={this.state.chartData} onSubmit={this.closeModal} />
              </Modal>,
              document.body,
            )}
        </div>
        {this.state.chartData.length > 0 && (
          <Suspense fallback={<Loader />}>
            <Chart data={this.state.chartData} />
          </Suspense>
        )}
      </>
    );
  }
}
