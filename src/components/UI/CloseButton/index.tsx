import { MouseEventHandler } from 'react';

import * as styles from './styles.module.css';

interface CloseButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export function CloseButton({ onClick, className }: CloseButtonProps) {
  return (
    <button type="button" onClick={onClick} className={`${styles.closeButton} ${className}`}>
      {' '}
    </button>
  );
}
