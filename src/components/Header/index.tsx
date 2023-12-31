import 'react-toggle/style.css';

import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Toggle from 'react-toggle';

import svg from '../../assets/logo.svg';
import ThemeContext from '../../context/Theme.context';
import styles from './styles.module.css';

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleHandler = () => toggleTheme!();
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={svg} alt="icon" className={styles['header-logo']} />
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
