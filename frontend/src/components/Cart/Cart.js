import React, { Fragment, useContext } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import CartItem from '../CartItem/CartItem';
import WideButton from '../WideButton/WideButton';
import { CartContext } from '../../context/cart-context';
import './CartAnimation.css';
import styles from './Cart.module.css';

export default function Cart() {
  const cart = useContext(CartContext);

  const history = useHistory();

  const checkout = () => {
    cart.close();
    history.push("/checkout");
  }

  const continueShopping = () => {
    cart.close();
    history.push("/shop");
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
            <div className={styles.close} onClick={cart.close}>&times;</div>
            <h3>REVIEW YOUR CART</h3>
            <div className={styles.ghost} onClick={cart.close}>&times;</div>
          </div>
          {(Object.keys(cart.state.items).length === 0)
            ? <div className={styles.empty}>Your Cart is Empty</div>
            : <div className={styles.content}>
                {Object.keys(cart.state.items).map((item, index) => (
                  <CartItem
                    item={cart.state.items[item]}
                    add={() => cart.addItem(cart.state.items[item])}
                    remove={() => cart.removeItem(cart.state.items[item])}
                    key={index}
                  />
                ))}
                <h3>TOTAL: ${cart.state.priceTotal}</h3>
                <div className={styles.wideBtns}>
                  <WideButton onClick={checkout}>
                    CHECKOUT
                  </WideButton>
                  <WideButton 
                    className={styles.continueBtn} 
                    onClick={continueShopping}
                  >
                    CONTINUE SHOPPING
                  </WideButton>
                </div>
              </div>
          }
        </aside>
      </CSSTransition>
    </Fragment>
  );

  return ReactDOM.createPortal(content, document.getElementById('cart-hook'));
}
