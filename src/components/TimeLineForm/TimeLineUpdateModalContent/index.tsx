import { ChangeEvent, Component, createRef, FormEvent } from 'react';

import { dayData, notification } from '../../../utils/Observer';
import { ChartDataType } from '../../Chart';
import { Button } from '../../UI';
import * as styles from './styles.module.css';

export interface TimeLineUpdateModalContentProps {
  data: ChartDataType[];
  onSubmit: () => void;
}

interface TimeLineUpdateModalContentState {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
}

export class TimeLineUpdateModalContent extends Component<
  TimeLineUpdateModalContentProps,
  TimeLineUpdateModalContentState
> {
  dateRef = createRef<HTMLSelectElement>();

  openRef = createRef<HTMLInputElement>();

  highRef = createRef<HTMLInputElement>();

  lowRef = createRef<HTMLInputElement>();

  closeRef = createRef<HTMLInputElement>();

  componentDidMount() {
    this.setInputValuesForDate(this.props.data[0].x);
  }

  setInputValuesForDate = (date: string) => {
    const [open, high, low, close] = this.props.data.find((obj) => obj.x === date)!.y;
    this.openRef.current!.value = open.toString();
    this.highRef.current!.value = high.toString();
    this.lowRef.current!.value = low.toString();
    this.closeRef.current!.value = close.toString();
  };

  submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const date = this.dateRef.current!.value;
    const open = this.openRef.current!.value;
    const high = this.highRef.current!.value;
    const low = this.lowRef.current!.value;
    const close = this.closeRef.current!.value;

    dayData.notify({ x: date, y: [open, high, low, close] });
    notification.notify({ status: 'success', header: 'Chart', info: 'Has been updated' });
    this.props.onSubmit();
  };

  dateChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setInputValuesForDate(event.target.value);
  };

  render() {
    return (
      <>
        <h3 className={styles.formHeader}>Update data for a day</h3>
        <form onSubmit={this.submitHandler} className={styles.updateForm}>
          <label htmlFor="date">
            <span>Date</span>

            <select id="date" name="date" required onChange={this.dateChangeHandler} ref={this.dateRef}>
              {this.props.data.map((a) => (
                <option key={a.x} value={a.x}>
                  {a.x}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="open">
            <span>Open</span>
            <input
              type="number"
              id="open"
              name="open"
              step="0.000000000001"
              min="0.000000000001"
              required
              ref={this.openRef}
            />
          </label>
          <label htmlFor="high">
            <span>High</span>
            <input
              type="number"
              id="high"
              name="high"
              step="0.000000000001"
              min="0.000000000001"
              required
              ref={this.highRef}
            />
          </label>
          <label htmlFor="low">
            <span>Low</span>
            <input
              type="number"
              id="low"
              name="low"
              step="0.000000000001"
              min="0.000000000001"
              required
              ref={this.lowRef}
            />
          </label>
          <label htmlFor="close">
            <span>Close</span>
            <input
              type="number"
              id="close"
              name="close"
              step="0.000000000001"
              min="0.000000000001"
              required
              ref={this.closeRef}
            />
          </label>

          <Button>Submit</Button>
        </form>
      </>
    );
  }
}
