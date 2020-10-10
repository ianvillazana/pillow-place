import React from 'react';
import { Link } from 'react-router-dom';

import twitterIcon from '../../images/SVG/twitter.svg';
import facebookIcon from '../../images/SVG/facebook.svg';
import instagramIcon from '../../images/SVG/instagram.svg';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.grid} max-width`}>
        <div className={styles.gridItem}>
          <h5>SUPPORT</h5>
          <ul>
            <li>ACCOUNT</li>
            <li><Link to="/contact-us">CONTACT US</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/return-policy">RETURN POLICY</Link></li>
            <li><Link to="/shipping">SHIPPING</Link></li>
            <li>TERMS OF SERVICE</li>
          </ul>
        </div>
        <div className={styles.gridItem}>
          <h5>CONTACT INFO</h5>
          <div className={styles.contactRow}>
            <div className={styles.contactSection}>
              <h6>EMAIL</h6>
              <p>info@pillowplace.zzz</p>
            </div>
            <div className={styles.contactSection}>
              <h6>PHONE</h6>
              <p>555-745-5697</p>
            </div>
          </div>
          <div className={styles.contactRow}>
            <div className={styles.contactSection}>
              <h6>ADDRESS</h6>
              <p>1100 Pillow Place</p>
              <p>Pillowtown, Ontario</p>
              <p>Z2Z 2Z2</p>
            </div>
            <div className={styles.contactSection}>
              <h6>STORE HOURS</h6>
              <p>MON-FRI: 10am-6pm</p>
              <p>SAT: 11am-5pm</p>
              <p>SUN: CLOSED</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.icons}>
          <a href="https://twitter.com/">
            <img src={twitterIcon} alt="twitter" />
          </a>
          <a href="https://facebook.com/">
            <img src={facebookIcon} alt="facebook" />
          </a>
          <a href="https://instagram.com/">
            <img src={instagramIcon} alt="instagram" />
          </a>
        </div>
        <div>
          <p>© PILLOW PLACE 2020</p>
        </div>
      </div>
    </footer>
  );
}
