import { Component, FormEvent } from 'react';

import observer from '../../utils/Observer';
import { ChartDataType } from '../ApexChart';
import Button from '../UI/Button';
import * as styles from './styles.module.css';

export interface TimeLineUpdateModalContentProps {
  data: ChartDataType[];
  onSubmit: () => void;
}

class TimeLineUpdateModalContent extends Component<TimeLineUpdateModalContentProps> {
  componentDidMount() {}

  submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { date, open, close, high, low } = Object.fromEntries(formData);

    observer.notify({ x: date, y: [open, high, low, close] });
    this.props.onSubmit();
  };

  render() {
    return (
      <>
        <h3 className={styles.formHeader}>Update data for a day</h3>
        <form onSubmit={this.submitHandler} className={styles.updateForm}>
          <label htmlFor="date">
            <span>Date</span>

            <select id="date" name="date" required>
              {this.props.data.map((a) => (
                <option key={a.x} value={a.x}>
                  {a.x}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="open">
            <span>Open</span>
            <input type="number" id="open" name="open" step="0.0001" required />
          </label>
          <label htmlFor="close">
            <span>Close</span>
            <input type="number" id="close" name="close" step="0.0001" required />
          </label>
          <label htmlFor="high">
            <span>High</span>
            <input type="number" id="high" name="high" step="0.0001" required />
          </label>
          <label htmlFor="low">
            <span>Low</span>
            <input type="number" id="low" name="low" step="0.0001" required />
          </label>
          <Button>Submit</Button>
        </form>
      </>
    );
  }
}

export default TimeLineUpdateModalContent;
