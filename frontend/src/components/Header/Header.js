import React from 'react';

import IconButton from '../../components/IconButton/IconButton';
import logo from '../../images/homepage/logo.png';
import menuIcon from '../../images/SVG/menu.svg';
import cartIcon from '../../images/SVG/shopping-cart.svg';
import styles from './Header.module.css';

export default function Header() {
 return (
  <header className={styles.header}>
    <div className={styles.top}>
      <div className={styles.options}>
        <button>CREATE ACCOUNT</button>
        <p>•</p>
        <button>LOG IN</button>
      </div>
    </div>
    <div className={styles.bottom}>
      <IconButton icon={menuIcon} />
      <div className={styles.logo}>
        <img src={logo} alt="Pillow Place" />
      </div>
      <IconButton icon={cartIcon} />
    </div>
  </header>
 );
}
