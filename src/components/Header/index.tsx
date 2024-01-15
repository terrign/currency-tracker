import logoSvg from 'assets/logo.svg';
import { Navigation } from 'components/Navigation';
import { Toggler } from 'components/UI';
import { useTheme } from 'hooks/useTheme';
import { Link } from 'react-router-dom';
import { Route } from 'router/routes';

import * as styles from './styles.module.css';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  const toggleHandler = () => toggleTheme!();
  return (
    <header className={styles.header}>
      <Link to={Route.HOME}>
        <img src={logoSvg} alt="icon" className={styles.headerLogo} />
      </Link>
      <Navigation />
      <Toggler checked={theme === 'light'} onChange={toggleHandler} />
    </header>
  );
}
