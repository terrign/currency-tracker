import { ChangeEvent, Component, FormEvent } from 'react';

import { CUR_ISO_SYMBOL_MAP } from '../../constants/currencyISOSymbolMap';
import { today } from '../../utils/date';
import Button from '../UI/Button';
import Loader from '../UI/Loader';
import * as styles from './styles.module.css';

interface TimeLineProps {
  submitHandler: (values: TimeLineFormState) => Promise<void>;
  isLoading: boolean;
}

export interface TimeLineFormState {
  baseCurrency: string;
  compareCurrency: string;
  startDate: string;
  endDate: string;
}

class TimeLineForm extends Component<TimeLineProps, TimeLineFormState> {
  constructor(props: TimeLineProps) {
    super(props);
    this.state = {
      baseCurrency: '',
      compareCurrency: '',
      startDate: '',
      endDate: '',
    };
  }

  changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const id = e.target.id as keyof TimeLineFormState;
    switch (id) {
      case 'baseCurrency':
        this.setState({ baseCurrency: e.target.value });
        break;
      case 'compareCurrency':
        this.setState({ compareCurrency: e.target.value });
        break;
      case 'endDate':
        this.setState({ endDate: e.target.value });
        break;
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
  };

  render() {
    return (
      <form className={styles.timeForm} onSubmit={this.submitHandler}>
        <label htmlFor="baseCurrency">
          <span>Currency</span>
          <select id="baseCurrency" value={this.state.baseCurrency} onChange={this.changeHandler}>
            {Object.keys(CUR_ISO_SYMBOL_MAP).map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="compareCurrency">
          <span>Compare Currency</span>
          <select id="compareCurrency" onChange={this.changeHandler} value={this.state.compareCurrency}>
            {Object.keys(CUR_ISO_SYMBOL_MAP).map((a) => (
              <option value={a} key={a}>
                {a}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="startDate">
          <span>Start Date</span>
          <input type="date" id="startDate" value={this.state.startDate} onChange={this.changeHandler} max={today()} />
        </label>

        <label htmlFor="endDate">
          <span>End Date</span>
          <input type="date" id="endDate" value={this.state.endDate} onChange={this.changeHandler} max={today()} />
        </label>
        {this.props.isLoading ? <Loader /> : <Button>Build</Button>}
      </form>
    );
  }
}

export default TimeLineForm;
