import 'react-toggle/style.css';

import { Link, NavLink } from 'react-router-dom';
import Toggle from 'react-toggle';

import logoSvg from '../../assets/logo.svg';
import useTheme from '../../hooks/useTheme';
import * as styles from './styles.module.css';

function Header() {
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
      <Toggle checked={theme === 'light'} onChange={toggleHandler} className="toggle" icons={false} />
    </header>
  );
}

export default Header;
