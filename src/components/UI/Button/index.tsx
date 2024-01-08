import { PropsWithChildren } from 'react';

import * as styles from './styles.module.css';

type DefaultButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps extends Exclude<DefaultButtonProps, DefaultButtonProps['className']> {}

function Button({ children, type, ...rest }: ButtonProps & PropsWithChildren) {
  return (
    <button {...rest} type={type} className={styles.button}>
      {children}
    </button>
  );
}

export default Button;
