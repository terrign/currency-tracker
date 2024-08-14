import logoSvg from 'assets/logo.svg';

import { COPYRIGHT_TEXT, FOOTER_SECTION_TEXT } from './constants';
import { FooterLinks } from './FooterLinks';
import * as styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <h3 className={`${styles.footerHeading}`}>
        <img src={logoSvg} alt="icon" />
        <p className="gradient-text">Modsen Currency Tracker</p>
      </h3>
      <section className={styles.footerContent}>
        <p>{FOOTER_SECTION_TEXT}</p>
        <FooterLinks />
      </section>
      <p className={styles.footerCopyright}>{COPYRIGHT_TEXT}</p>
    </footer>
  );
}
