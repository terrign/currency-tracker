import { Button } from 'components/UI';
import { ChartDataType, OHLC } from 'models';
import { ChangeEvent, ChangeEventHandler, Component, FormEvent } from 'react';
import { notificationObserver, timeLineDataObserver } from 'services/Observer';
import { capitalizeFirstLetter } from 'utils';

import { OHLCInput } from './OHLCInput';
import * as styles from './styles.module.css';
import { VALIDATION_MAP } from './validationMap';

export interface TimeLineUpdateModalContentProps {
  data: ChartDataType[];
  onSubmit: () => void;
}

interface TimeLineUpdateModalContentState {
  open: string;
  high: string;
  low: string;
  close: string;
  date: string;
  errors: {
    openError: string | null;
    highError: string | null;
    lowError: string | null;
    closeError: string | null;
  };
}

export class TimeLineUpdateModalContent extends Component<
  TimeLineUpdateModalContentProps,
  TimeLineUpdateModalContentState
> {
  constructor(props: TimeLineUpdateModalContentProps) {
    super(props);
    const date = this.props.data[0].x;
    const [open, high, low, close] = this.props.data[0].y;
    this.state = {
      date,
      open: String(open),
      high: String(high),
      low: String(low),
      close: String(close),
      errors: {
        openError: null,
        highError: null,
        lowError: null,
        closeError: null,
      },
    };
  }

  setInputValuesForDate = (date: string) => {
    const { y } = this.props.data.find((obj) => obj.x === date) as ChartDataType;
    const [open, high, low, close] = y.map((rate) => String(rate));

    this.setState({ open, high, low, close });
  };

  submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.validateFormValues();

    const { date, open, high, low, close } = this.state;

    timeLineDataObserver.notify({ x: date, y: [open, high, low, close] });
    notificationObserver.notify({ status: 'success', header: 'Chart', info: 'Has been updated' });
    this.props.onSubmit();
  };

  validateFormValues = () => {
    for (const name of [OHLC.OPEN, OHLC.HIGH, OHLC.LOW, OHLC.CLOSE]) {
      const errorKey = `${name}Error`;
      const value = this.state[name];
      const numberOHLCValue = Number(value);
      if (isNaN(numberOHLCValue)) {
        this.setState((prev) => ({
          errors: {
            ...prev.errors,
            [errorKey]: `"${name}" must be a number`,
          },
        }));
        continue;
      }

      if (numberOHLCValue <= 0) {
        this.setState((prev) => ({
          errors: {
            ...prev.errors,
            [errorKey]: `"${capitalizeFirstLetter(name)}" must be higher then sezo`,
          },
        }));
        continue;
      }
      const { open, high, low, close } = this.state;
      const numFormValues = {
        open: Number(open),
        high: Number(high),
        low: Number(low),
        close: Number(close),
      };

      if (VALIDATION_MAP[name].validationFunc(numFormValues)) {
        this.setState((prev) => ({ errors: { ...prev.errors, [errorKey]: VALIDATION_MAP[name].errorMessage } }));
      } else {
        this.setState((prev) => ({ errors: { ...prev.errors, [errorKey]: null } }));
      }
    }
  };

  dateChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ date: event.target.value });
    this.setInputValuesForDate(event.target.value);
  };

  hasError = () => {
    const { openError, highError, lowError, closeError } = this.state.errors;
    return !!openError || !!highError || !!lowError || !!closeError;
  };

  OHLCChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    const key = event.target.id as OHLC;
    this.setState(
      (prev) => ({ ...prev, [key]: value }),
      () => this.validateFormValues(),
    );
  };

  render() {
    const { date, open, high, low, close } = this.state;
    const { openError, highError, lowError, closeError } = this.state.errors;
    return (
      <>
        <h3 className={styles.formHeader}>Update data for a day</h3>
        <form onSubmit={this.submitHandler} className={styles.updateForm}>
          <label htmlFor="date">
            <span>Date</span>

            <select id="date" name="date" required onChange={this.dateChangeHandler} value={date}>
              {this.props.data.map((a) => (
                <option key={a.x} value={a.x}>
                  {a.x}
                </option>
              ))}
            </select>
          </label>
          <OHLCInput name={OHLC.OPEN} value={open} error={openError} onChange={this.OHLCChangeHandler} />
          <OHLCInput name={OHLC.HIGH} value={high} error={highError} onChange={this.OHLCChangeHandler} />
          <OHLCInput name={OHLC.LOW} value={low} error={lowError} onChange={this.OHLCChangeHandler} />
          <OHLCInput name={OHLC.CLOSE} value={close} error={closeError} onChange={this.OHLCChangeHandler} />
          <Button disabled={this.hasError()}>Submit</Button>
        </form>
      </>
    );
  }
}
