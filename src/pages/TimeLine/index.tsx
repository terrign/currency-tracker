import { TimeLineForm, TimeLineFormState } from 'components/TimeLineForm';
import { TimeLineUpdateModalContent } from 'components/TimeLineUpdateModalContent';
import { Button, Loader, Modal } from 'components/UI';
import { Component, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { timeLineDataObserver } from 'services/Observer';
import { ChartDataType } from 'types';
import { generateRandomCurrencyHistoryData } from 'utils';

import * as styles from './styles.module.css';

const Chart = lazy(() => import('components/Chart').then((module) => ({ default: module['Chart'] })));

interface TimeLineState {
  chartData: ChartDataType[];
  showModal: boolean;
}
interface Props {}

export class TimeLine extends Component<Props, TimeLineState> {
  state: TimeLineState = {
    chartData: [],
    showModal: false,
  };

  componentDidMount(): void {
    timeLineDataObserver.subscribe(this.updateDayData);
  }

  componentWillUnmount(): void {
    timeLineDataObserver.unsubscribe(this.updateDayData);
  }

  updateDayData = (newData: unknown) => {
    const convertedNewData = newData as ChartDataType;
    this.setState((prev) => ({
      chartData: prev.chartData.map((data) => {
        if (data.x === convertedNewData.x) {
          return convertedNewData;
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
    const { chartData, showModal } = this.state;
    return (
      <>
        <section className={styles.wrapper}>
          <TimeLineForm submitHandler={this.submitHandler} />
          <Button onClick={this.openModal} disabled={chartData.length === 0}>
            Update
          </Button>

          {showModal &&
            createPortal(
              <Modal onClose={this.closeModal}>
                <TimeLineUpdateModalContent data={chartData} onSubmit={this.closeModal} />
              </Modal>,
              document.body,
            )}
        </section>
        {chartData.length > 0 && (
          <Suspense fallback={<Loader />}>
            <Chart data={chartData} />
          </Suspense>
        )}
      </>
    );
  }
}
