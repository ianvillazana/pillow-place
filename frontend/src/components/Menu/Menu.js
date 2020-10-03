import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import NavLink from '../NavLink/NavLink';
import styles from './Menu.module.css';

export default function Menu(props) {
  const { show, onClick } = props;

  const content = (
    <CSSTransition
      in={show}
      classNames="slide-in-left"
      timeout={0}
      mountOnEnter
      unmountOnExit
    >
      <aside className={styles.menu}>
        <nav>
          <NavLink route="/shop/all" onClick={onClick}>
            All Pillows
          </NavLink>
          <NavLink route="/shop/side-sleeper" onClick={onClick}>
            Side Sleeper
          </NavLink>
          <NavLink route="/shop/back-sleeper" onClick={onClick}>
            Back Sleeper
          </NavLink>
          <NavLink route="/shop/mixed-sleeper" onClick={onClick}>
            Mixed Sleeper
          </NavLink>
          <NavLink route="/contact-us" onClick={onClick}>
            Contact Us
          </NavLink>
          <NavLink route="/faq" onClick={onClick}>
            FAQ
          </NavLink>
          <NavLink route="/return-policy" onClick={onClick}>
            Return Policy
          </NavLink>
          <NavLink route="/shipping" onClick={onClick}>
            Shipping
          </NavLink>
        </nav>
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById('menu-hook'));
}
