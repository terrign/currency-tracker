import { Component } from 'react';

import ApexChart, { ChartDataType } from '../components/ApexChart';
import TimeLineForm, { TimeLineFormState } from '../components/TimeLineForm';
import { NoProps } from '../models';
import coinApi from '../services/coinApi.service';
import { toStringDate } from '../utils/date';

interface TimeLineState {
  chartData: ChartDataType[];
  isLoading: boolean;
}

class TimeLine extends Component<NoProps, TimeLineState> {
  constructor(props: NoProps) {
    super(props);
    this.state = {
      chartData: [],
      isLoading: false,
    };
  }

  submitHandler = async (formState: TimeLineFormState) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await coinApi.getCurrencyHistory(formState);
      const result = data.map((a) => {
        const date = toStringDate(new Date(a.time_period_start));
        return {
          x: date,
          y: [a.rate_open, a.rate_high, a.rate_low, a.rate_close],
        };
      });

      this.setState({ chartData: result });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <>
        <TimeLineForm submitHandler={this.submitHandler} isLoading={this.state.isLoading} />
        {this.state.chartData.length > 0 && <ApexChart data={this.state.chartData} />}
      </>
    );
  }
}

export default TimeLine;
