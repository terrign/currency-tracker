import logoSvg from 'assets/logo.svg';

import * as styles from './styles.module.css';

export function SubHeader() {
  return (
    <div className={styles.subHeader}>
      <div className={styles.subHeaderText}>
        <h1 className="gradient-text">
          <p>Modsen Currency</p>
          <p className={styles.subHeaderText2NdLine}>Tracker</p>
        </h1>
        <p className={styles.subHeaderTextParagraph}>Quotes for the dollar and other international currencies.</p>
      </div>
      <img src={logoSvg} alt="icon" className={styles.logoBig} />
    </div>
  );
}
