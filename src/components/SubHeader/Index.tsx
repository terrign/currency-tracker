import svg from '../../assets/logo.svg';
import styles from './styles.module.css';

function SubHeader() {
  return (
    <div className={styles['sub-header']}>
      <div className={styles['sub-header-text']}>
        <h1 className="gradient-text">
          <p>Modsen Currency</p>
          <p className={styles['sub-header-text__2nd-line']}>Tracker</p>
        </h1>
        <p className={styles['sub-header-text__paragraph']}>
          Quotes for the dollar and other international currencies.
        </p>
      </div>
      <img src={svg} alt="icon" className={styles['logo-big']} />
    </div>
  );
}

export default SubHeader;
