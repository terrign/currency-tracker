import { Route } from 'router/routes';

import { NavItem } from './NavItem';
import * as styles from './styles.module.css';

export function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul>
        <NavItem route={Route.HOME} />
        <NavItem route={Route.TIMELINE} />
        <NavItem route={Route.BANKMAP} />
        <NavItem route={Route.CONTACTS} />
      </ul>
    </nav>
  );
}
