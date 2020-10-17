import React, { Fragment, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import IconButton from '../../components/IconButton/IconButton';
import Menu from '../../components/Menu/Menu';
import { AuthContext } from '../../context/auth-context';
import { CartContext } from '../../context/cart-context';
import logo from '../../images/homepage/logo.png';
import menuIcon from '../../images/SVG/menu.svg';
import cartIcon from '../../images/SVG/shopping-cart.svg';
import styles from './Header.module.css';

export default function Header() {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const history = useHistory();

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
          {!auth.state.isLoggedIn ? (
            <Fragment>
              <button onClick={() => auth.open(false)}>CREATE ACCOUNT</button>
              <p>•</p>
              <button onClick={() => auth.open(true)}>LOG IN</button>
            </Fragment>
          ) : (
            <Fragment>
              <button onClick={() => history.push("/account")}>MY ACCOUNT</button>
              <p>•</p>
              <button onClick={() => auth.logout()}>LOG OUT</button>
            </Fragment>
          )}
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
