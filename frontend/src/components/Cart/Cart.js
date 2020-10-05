import React, { Fragment, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import CartItem from '../CartItem/CartItem';
import { CartContext } from '../../context/cart-context';
import './CartAnimation.css';
import styles from './Cart.module.css';

export default function Cart() {
  const cart = useContext(CartContext);

  // Close cart when browser back button is pressed.
  useEffect(() => {
    window.onpopstate = () => cart.close();
  });

  // Disable scrolling of the body while cart is open.
  if (cart.state.show) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  const content = (
    <Fragment>
      {cart.state.show && <Backdrop onClick={cart.close} />}
      <CSSTransition 
        in={cart.state.show} 
        timeout={200} 
        classNames="slide-in-right" 
        mountOnEnter 
        unmountOnExit
      >
        <aside className={styles.cart}>
          <div className={styles.top}>
            <h3>REVIEW YOUR CART</h3>
            <div className={styles.close} onClick={cart.close}>&times;</div>
          </div>
          <div className={styles.content}>
            {(Object.keys(cart.state.items).length === 0)
              ? <div className={styles.empty}>Your Cart is Empty</div> 
              : Object.keys(cart.state.items).map((item, index) => (
                <CartItem 
                  item={cart.state.items[item]} 
                  add={() => cart.addItem(cart.state.items[item])}
                  remove={() => cart.removeItem(cart.state.items[item])}
                  key={index} 
                />
              ))
            }
          </div>  
        </aside>
      </CSSTransition>
    </Fragment>
  );

  return ReactDOM.createPortal(content, document.getElementById('cart-hook'));
}
