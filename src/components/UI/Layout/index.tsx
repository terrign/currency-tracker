import { PropsWithChildren } from 'react';

import * as styles from './styles.module.css';

export function Layout({ children }: PropsWithChildren) {
  return <div className={styles.layout}>{children}</div>;
}
