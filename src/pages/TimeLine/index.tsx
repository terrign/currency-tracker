import { Component, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';

import { ChartDataType } from '../../components/Chart';
import TimeLineForm, { TimeLineFormState } from '../../components/TimeLineForm';
import TimeLineUpdateModalContent from '../../components/TimeLineForm/TimeLineUpdateModalContent';
import Button from '../../components/UI/Button';
import Loader from '../../components/UI/Loader';
import Modal from '../../components/UI/Modal';
import { NoProps } from '../../models';
import { generateRandomCurrencyHistoryData } from '../../utils/generateRandomCurrencyHistoryData';
import { dayData } from '../../utils/Observer';
import * as styles from './styles.module.css';

const Chart = lazy(() => import('../../components/Chart'));

interface TimeLineState {
  chartData: ChartDataType[];
  showModal: boolean;
}

class TimeLine extends Component<NoProps, TimeLineState> {
  constructor(props: NoProps) {
    super(props);
    this.state = {
      chartData: [],
      showModal: false,
    };
  }

  componentDidMount(): void {
    dayData.subscribe(this.updateDayData);
  }

  componentWillUnmount(): void {
    dayData.unsubscribe(this.updateDayData);
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

export default TimeLine;
