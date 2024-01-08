import { Component } from 'react';
import { createPortal } from 'react-dom';

import ApexChart, { ChartDataType } from '../components/ApexChart';
import TimeLineForm, { TimeLineFormState } from '../components/TimeLineForm';
import TimeLineUpdateModalContent from '../components/TimeLineUpdateModalContent';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import { NoProps } from '../models';
import { generateRandomCurrencyHistoryData } from '../utils/generateRandomCurrencyHistoryData';
import observer from '../utils/Observer';
import * as styles from './styles.module.css';

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
    observer.subscribe(this.updateDayData);
  }

  componentWillUnmount(): void {
    observer.unsubscribe(this.updateDayData);
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

  submitHandler = async (formState: TimeLineFormState) => {
    this.setState({ chartData: generateRandomCurrencyHistoryData(new Date(formState.startDate)) });
  };

  render() {
    return (
      <>
        <div className={styles.timeLineWrapper}>
          <TimeLineForm submitHandler={this.submitHandler} />
          <Button onClick={this.openModal}>Update</Button>

          {this.state.showModal &&
            createPortal(
              <Modal onClose={this.closeModal}>
                <TimeLineUpdateModalContent data={this.state.chartData} onSubmit={this.closeModal} />
              </Modal>,
              document.body,
            )}
        </div>
        {this.state.chartData.length > 0 && <ApexChart data={this.state.chartData} />}
      </>
    );
  }
}

export default TimeLine;
