import { CloseButton } from 'components/UI/CloseButton';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Route } from 'types';

import { NavItem } from './NavItem';
import * as styles from './styles.module.css';

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const menuButtonClickHandler = () => {
    setMenuOpen(true);
  };

  const closeButtonHandler = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className={styles.menu}>
      {!menuOpen && (
        <button type="button" className={styles.burgerMenuButton} onClick={menuButtonClickHandler}>
          <span className={styles.burgerIcon} />
        </button>
      )}
      <nav className={`${styles.navigation} ${menuOpen && styles.navigationOpen}`}>
        <ul>
          <NavItem route={Route.HOME} />
          <NavItem route={Route.TIMELINE} />
          <NavItem route={Route.BANKMAP} />
          <NavItem route={Route.CONTACTS} />
        </ul>
        <CloseButton onClick={closeButtonHandler} className={styles.closeButton} />
      </nav>
    </div>
  );
}
