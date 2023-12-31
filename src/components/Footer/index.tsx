import svg from '../../assets/logo.svg';
import styles from './styles.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <h3 className={`${styles['footer-heading']}`}>
        <img src={svg} alt="icon" />
        <p className="gradient-text">Modsen Currency Tracker</p>
      </h3>
      <div className={styles['footer-content']}>
        <p>
          Since then, the company has grown organically to. Startsup is the world&apos;s largest trading platform, with
          $12 billion worth of currency trading and 500,000 tickets sold daily to tens of thousands of traders
          worldwide.
        </p>
        <div className={styles['footer-links']}>
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
      <p className={styles['footer-copyright']}>Startsup © 2023-2024, All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
