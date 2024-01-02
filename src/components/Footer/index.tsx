import logoSvg from '../../assets/logo.svg';
import * as styles from './styles.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <h3 className={`${styles.footerHeading}`}>
        <img src={logoSvg} alt="icon" />
        <p className="gradient-text">Modsen Currency Tracker</p>
      </h3>
      <div className={styles.footerContent}>
        <p>
          Since then, the company has grown organically to. Startsup is the world&apos;s largest trading platform, with
          $12 billion worth of currency trading and 500,000 tickets sold daily to tens of thousands of traders
          worldwide.
        </p>
        <div className={styles.footerLinks}>
          <div>
            <a href="/#">General</a>
            <a href="/#">Market</a>
            <a href="/#">Service</a>
          </div>
          <div>
            <a href="/#">Product</a>
            <a href="/#">Sparks</a>
            <a href="/#">Snaps</a>
          </div>
          <div>
            <a href="/#">Community</a>
            <a href="/#">Ideas</a>
            <a href="/#">Streams</a>
          </div>
        </div>
      </div>
      <p className={styles.footerCopyright}>Startsup © 2023-2024, All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
