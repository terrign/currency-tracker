import { ChangeEvent, Component, FormEvent } from 'react';

import { CUR_ISO_SYMBOL_MAP, CurISO } from '../../constants/currencyISOSymbolMap';
import { today } from '../../utils/date';
import { notification } from '../../utils/Observer';
import { AutoComplete } from '../Autocomplete';
import { Button } from '../UI';
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
  constructor(props: TimeLineProps) {
    super(props);
    this.state = {
      baseCurrency: '',
      compareCurrency: '',
      startDate: '',
    };
  }

  // @ts-expect-error unused param
  shouldComponentUpdate(_, nextState: Readonly<TimeLineFormState>): boolean {
    return (
      nextState.baseCurrency !== this.state.baseCurrency ||
      nextState.compareCurrency !== this.state.compareCurrency ||
      nextState.startDate !== this.state.startDate
    );
  }

  componentDidUpdate(): void {
    if (!!this.state.baseCurrency && !!this.state.compareCurrency && !!this.state.startDate) {
      this.props.submitHandler(this.state);
      notification.notify({ status: 'success', info: 'Has been created', header: 'Chart' });
    }
  }

  dateChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    this.setState({ startDate: e.target.value });
  };

  submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.submitHandler(this.state);
    notification.notify({ status: 'success', info: 'Random data generated', header: 'Chart' });
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
              searchObject={CUR_ISO_SYMBOL_MAP}
              selectHandler={this.updateBaseCurrency}
              defaultValue=""
              name="baseCurrency"
              className={styles.timeLineAutoComplete}
            />
          </label>

          <label htmlFor="compareCurrency">
            <span>Compare currency</span>
            <AutoComplete
              searchObject={CUR_ISO_SYMBOL_MAP}
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
              required
            />
          </label>

          <Button type="submit" style={{ alignSelf: 'flex-end' }}>
            Randomize
          </Button>
        </form>
      </>
    );
  }
}
