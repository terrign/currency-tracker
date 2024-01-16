import { useRef } from 'react';

import * as styles from './styles.module.css';

interface TogglerProps {
  checked?: boolean;
  onChange?: () => void;
}

export function Toggler({ checked, onChange }: TogglerProps) {
  const checkBoxRef = useRef<HTMLInputElement>(null);

  const clickHandler = () => {
    const input = checkBoxRef.current;
    if (input) {
      input.checked = !input.checked;
      if (onChange) {
        onChange();
      }
    }
  };

  return (
    <button className={styles.toggler} type="button" onClick={clickHandler} aria-hidden>
      <input type="checkbox" style={{ display: 'none' }} checked={checked} ref={checkBoxRef} readOnly />
      <div className={styles.togglerBar} />
    </button>
  );
}
