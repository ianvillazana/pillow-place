import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import IconButton from '../../components/IconButton/IconButton';
import Menu from '../../components/Menu/Menu';
import { CartContext } from '../../context/cart-context';
import logo from '../../images/homepage/logo.png';
import menuIcon from '../../images/SVG/menu.svg';
import cartIcon from '../../images/SVG/shopping-cart.svg';
import styles from './Header.module.css';

export default function Header() {
  const cart = useContext(CartContext);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const openMenu = () => {
    cart.close();
    setMenuIsOpen(!menuIsOpen);
  }

  const openCart = () => {
    setMenuIsOpen(false);
    cart.state.show ? cart.close() : cart.open();
  }

  const closeAll = () => {
    setMenuIsOpen(false);
    cart.close();
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
          <Link to="/">
            <img src={logo} alt="Pillow Place" onClick={closeAll} />
          </Link>
        </div>
        <IconButton icon={cartIcon} onClick={openCart}>
          {cart.state.itemTotal > 0 ? cart.state.itemTotal : null}
        </IconButton>
      </div>
    </header>
  );
}
