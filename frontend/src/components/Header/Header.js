import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import IconButton from '../../components/IconButton/IconButton';
import Menu from '../../components/Menu/Menu';
import logo from '../../images/homepage/logo.png';
import menuIcon from '../../images/SVG/menu.svg';
import cartIcon from '../../images/SVG/shopping-cart.svg';
import styles from './Header.module.css';

export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const openMenu = () => {
    setCartIsOpen(false);
    setMenuIsOpen(!menuIsOpen);
  }

  const openCart = () => {
    setMenuIsOpen(false);
    setCartIsOpen(!cartIsOpen);
  }

  return (
    <header className={styles.header}>
      {menuIsOpen && <Menu onClick={() => setMenuIsOpen(false)} />}
      <div className={styles.top}>
        <div className={styles.options}>
          <button>CREATE ACCOUNT</button>
          <p>•</p>
          <button>LOG IN</button>
        </div>
      </div>
      <div className={styles.bottom}>
        <IconButton icon={menuIcon} onClick={openMenu} />
        <div className={styles.logo}>
          <Link to="/"><img src={logo} alt="Pillow Place" /></Link>
        </div>
        <IconButton icon={cartIcon} onClick={openCart} />
      </div>
    </header>
  );
}
