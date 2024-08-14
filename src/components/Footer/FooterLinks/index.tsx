import { FOOTER_LINKS } from '../constants';
import * as styles from './styles.module.css';

export function FooterLinks() {
  return (
    <ul className={styles.footerLinks}>
      {FOOTER_LINKS.map((linkGroup) => {
        return (
          <li key={linkGroup[0]}>
            <ul>
              {linkGroup.map((link) => (
                <li key={link}>
                  <a href={'/#'}>{link}</a>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
