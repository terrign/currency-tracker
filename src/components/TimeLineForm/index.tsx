import { CURRENCY_ISO_SYMBOL_MAP } from '@constants';
import { Button } from 'components/UI';
import { ChangeEvent, Component, createRef, FormEvent } from 'react';
import { notificationObserver } from 'services/Observer';
import { CurISO, NotificationStatus } from 'types';
import { today } from 'utils';

import { AutoComplete } from '../Autocomplete';
import * as styles from './styles.module.css';

interface TimeLineProps {
  submitHandler: (values: TimeLineFormState) => void;
}

export interface TimeLineFormState {
  baseCurrency: string;
  compareCurrency: string;
  startDate: string;
}

export class TimeLineForm extends Component<TimeLineProps, TimeLineFormState> {
  timerId = createRef<number>();
  constructor(props: TimeLineProps) {
    super(props);
    this.state = {
      baseCurrency: '',
      compareCurrency: '',
      startDate: '',
    };
  }

  shouldComponentUpdate(_: never, nextState: Readonly<TimeLineFormState>): boolean {
    return (
      nextState.baseCurrency !== this.state.baseCurrency ||
      nextState.compareCurrency !== this.state.compareCurrency ||
      nextState.startDate !== this.state.startDate
    );
  }

  componentDidUpdate(): void {
    const { baseCurrency, compareCurrency, startDate } = this.state;
    if (baseCurrency && compareCurrency && startDate) {
      this.props.submitHandler(this.state);
      notificationObserver.notify({ status: NotificationStatus.SUCCESS, info: 'Has been created', header: 'Chart' });
    }
  }

  preventManualDateInput = () => false;

  dateChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    this.setState({ startDate: event.target.value });
  };

  submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.submitHandler(this.state);
    notificationObserver.notify({ status: NotificationStatus.SUCCESS, info: 'Random data generated', header: 'Chart' });
  };

  updateCompareCurrency = (key: CurISO) => () => {
    this.setState({ compareCurrency: key });
  };

  updateBaseCurrency = (key: CurISO) => () => {
    this.setState({ baseCurrency: key });
  };

  render() {
    return (
      <>
        <h2 className={styles.timeLineHeader}>Build currency rate chart</h2>
        <form className={styles.timeForm} onSubmit={this.submitHandler}>
          <label htmlFor="baseCurrency">
            <span>Currency</span>
            <AutoComplete
              searchObject={CURRENCY_ISO_SYMBOL_MAP}
              selectHandler={this.updateBaseCurrency}
              defaultValue=""
              name="baseCurrency"
              className={styles.timeLineAutoComplete}
            />
          </label>

          <label htmlFor="compareCurrency">
            <span>Compare currency</span>
            <AutoComplete
              searchObject={CURRENCY_ISO_SYMBOL_MAP}
              selectHandler={this.updateCompareCurrency}
              defaultValue=""
              name="compareCurrency"
              className={styles.timeLineAutoComplete}
            />
          </label>

          <label htmlFor="startDate">
            <span>Start Date</span>
            <input
              type="date"
              id="startDate"
              value={this.state.startDate}
              onChange={this.dateChangeHandler}
              max={today()}
              onKeyDown={this.preventManualDateInput}
              required
            />
          </label>

          <Button type="submit">Randomize</Button>
        </form>
      </>
    );
  }
}
