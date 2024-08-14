import { OHLC_STEP } from '@constants';
import { ChangeEventHandler } from 'react';
import { OHLC } from 'types';
import { capitalizeFirstLetter } from 'utils';

import * as styles from './styles.module.css';

interface OHLCInputProps {
  name: OHLC;
  error: string | null;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function OHLCInput({ name, error, value, onChange }: OHLCInputProps) {
  return (
    <label htmlFor={name} className={styles.formInput}>
      <span>{capitalizeFirstLetter(name)}</span>
      <div className={styles.inputWithError}>
        <input type="text" id={name} name={name} step={OHLC_STEP} required value={value} onChange={onChange} />
        <p data-testid={`${name}Error`}>{!!error && error}</p>
      </div>
    </label>
  );
}
