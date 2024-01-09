/* eslint-disable jsx-a11y/label-has-associated-control */

import { ChangeEvent, Component, ContextType, FormEvent } from 'react';

import { CUR_ISO_SYMBOL_MAP, CurISO } from '../../constants/currencyISOSymbolMap';
import AppContext from '../../context/App/App.context';
import { today } from '../../utils/date';
import { notification } from '../../utils/Observer';
import AutoComplete from '../Autocomplete';
import Button from '../UI/Button';
import * as styles from './styles.module.css';

interface TimeLineProps {
  submitHandler: (values: TimeLineFormState) => Promise<void>;
}

export interface TimeLineFormState {
  baseCurrency: string;
  compareCurrency: string;
  startDate: string;
}

class TimeLineForm extends Component<TimeLineProps, TimeLineFormState> {
  declare context: ContextType<typeof AppContext>;

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

  changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const id = e.target.id as keyof TimeLineFormState;
    switch (id) {
      case 'startDate':
        this.setState({ startDate: e.target.value });
        break;
      default:
        break;
    }
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
              defaultValue={this.context.preferredCurrency!}
              name="baseCurrency"
              className={styles.timeLineAutoComplete}
            />
          </label>

          <label htmlFor="compareCurrency">
            <span>Compare currency</span>
            <AutoComplete
              searchObject={CUR_ISO_SYMBOL_MAP}
              selectHandler={this.updateCompareCurrency}
              defaultValue={this.context.preferredCurrency!}
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
              onChange={this.changeHandler}
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

TimeLineForm.contextType = AppContext;

export default TimeLineForm;
