import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './CartAnimation.css';
import styles from './Cart.module.css';

export default function Cart(props) {
  const { show, onClick, children } = props;

  if (show) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  const content = (
    <CSSTransition 
      in={show} 
      timeout={200} 
      classNames="slide-in-right" 
      mountOnEnter 
      unmountOnExit
    >
      <aside className={styles.cart}>
        <p>Hello</p>
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById('cart-hook'));
}
