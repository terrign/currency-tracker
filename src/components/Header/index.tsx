import logoSvg from 'assets/logo.svg';
import { Toggler } from 'components/UI';
import { useTheme } from 'hooks/useTheme';
import { Link, NavLink } from 'react-router-dom';

import * as styles from './styles.module.css';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  const toggleHandler = () => toggleTheme!();
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logoSvg} alt="icon" className={styles.headerLogo} />
      </Link>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/timeline">Timeline</NavLink>
          </li>
          <li>
            <NavLink to="/bankmap">Bank Map</NavLink>
          </li>
          <li>
            <NavLink to="/contacts">Contacts</NavLink>
          </li>
        </ul>
      </nav>
      <Toggler checked={theme === 'light'} onChange={toggleHandler} />
    </header>
  );
}
