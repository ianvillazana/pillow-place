import React, { Fragment, useContext, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Modal from '../components/Modal/Modal';
import Spinner from '../components/Spinner/Spinner';
import WideButton from '../components/WideButton/WideButton';
import { AuthContext } from '../context/auth-context';
import { CartContext } from '../context/cart-context';
import { useHttpClient } from '../hooks/useHttpClient';
import getDateTime from '../utils/getDateTime';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../utils/validators';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [showModal, setShowModal] = useState(false);
  const orderId = useRef("");
  const history = useHistory();

  useEffect(() => {
    if (isLoading) {
      setShowModal(true);
    }
  }, [isLoading]);

  const submitHandler = async (event) => {
    event.preventDefault();

    let itemsArray = [];
    for (let item of Object.keys(cart.state.items)) {
      itemsArray.push(cart.state.items[item]);
    }

    try {
      const responseData = await sendRequest(
        'http://localhost:5000/api/orders',
        'POST',
        JSON.stringify({
          customerId: auth.state.user.id,
          dateTime: getDateTime(),
          items: itemsArray,
          totalPrice: cart.state.priceTotal
        }),
        { 'Content-Type': 'application/json'}
      );
      orderId.current = responseData.order.id;
      cart.completeOrder(true);
    } catch {}
  }

  const editOrder = (event) => {
    event.preventDefault();
    cart.open();
  }

  const closeModal = () => {
    if (!isLoading) {
      setShowModal(false);
      clearError();
      if (cart.state.orderComplete) {
        cart.clear();
        auth.state.isLoggedIn ? history.push("/account") : history.push("/")
      }
    }
  }

  const { ...items } = cart.state.items;

  const checkout = (
    <Fragment>
      <Modal show={showModal} onCancel={closeModal}>
        {isLoading ? <Spinner /> : (
          <Fragment>
            <div>
              {error 
                ? "Something went wrong. Please try again." 
                : `Order completed. Order ID: ${orderId.current}`
              }
            </div>
            <Button large onClick={closeModal}>OK</Button>
          </Fragment>
        )}
      </Modal>
      <h2>{auth.state.isLoggedIn ? "User" : "Guest"} Checkout</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <section className={styles.section}>
          <h5>Shipping Address</h5>
          {auth.state.isLoggedIn ? <div><h6>Name</h6> {auth.state.user.name}</div> : (
            <Input
              id="checkout-name"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your name."
              initialValue="Firstname Lastname"
              initialValid={true}
              onInput={() => {}}
            />
          )}
          <Input
            id="address"
            type="text"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Required"
            initialValue="123 Main Street"
            initialValid={true}
            onInput={() => {}}
          />
          <div className={styles.grid}>
            <Input
              id="city"
              type="text"
              label="City"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Required"
              initialValue="Pillowtown"
              initialValid={true}
              onInput={() => {}}
            />
            <Input
              id="state"
              type="text"
              label="State/City/Region"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Required"
              initialValue="Ontario"
              initialValid={true}
              onInput={() => {}}
            />
          </div>
          <div className={styles.grid}>
            <Input
              id="zipcode"
              type="text"
              label="Zip/Postal Code"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Required"
              initialValue="Z1Z 1Z1"
              initialValid={true}
              onInput={() => {}}
            />
            <Input
              id="country"
              type="text"
              label="Country"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Required"
              initialValue="Canada"
              initialValid={true}
              onInput={() => {}}
            />
          </div>
          {auth.state.isLoggedIn ? <div><h6>Email</h6> {auth.state.user.email}</div> : (
            <Input
              id="checkout-email"
              type="email"
              label="Email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email."
              initialValue="customer@mail.zzz"
              initialValid={true}
              onInput={() => {}}
            />
          )}
          {!auth.state.isLoggedIn && (
            <div onClick={auth.open} className={styles.openAuth}>
              Already have an account? Log in here!
            </div>
          )}
        </section>
        <section className={styles.section}>
          <h5>Payment Details</h5>
          <div className={styles.grid}>
            <Input
              id="name-on-card"
              type="text"
              label="Name on card"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Required"
              initialValue="Firstname Lastname"
              initialValid={true}
              onInput={() => {}}
            />
            <Input
              id="card-number"
              type="text"
              label="Card number"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Required"
              initialValue="xxxx-xxxx-xxxx-1234"
              initialValid={true}
              onInput={() => {}}
            />
          </div>
          <div className={styles.grid}>
            <Input
              id="expiry-date"
              type="text"
              label="Expiry date"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Required"
              initialValue="04/24"
              initialValid={true}
              onInput={() => {}}
            />
            <Input
              id="cvv"
              type="text"
              label="CVV"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Required"
              initialValue="123"
              initialValid={true}
              onInput={() => {}}
            />
          </div>
          <p className="caption">
            <strong>NOTE:</strong> Shipping address and payment details are 
            only for show. Input values in these sections are not read or sent 
            to the database; only the items in your cart. You do not need to 
            change the data entered above.
          </p>
        </section>
        <section className={styles.section}>
          <h5>Review Your Order</h5>
          {Object.keys(items).map((item, index) => (
            <div className={styles.item} key={index}>
              <div>
                <div>{items[item].name}</div>
                <div className={styles.itemSKU}>
                  {items[item].sku}
                </div>
              </div>
              <div>
                {items[item].count} &times; {items[item].price}
              </div>
            </div>
          ))}
          <div className={styles.item}>
            <div>Shipping</div>
            <div>FREE</div>
          </div>
          <div className={styles.item}>
            <div>Total</div>
            <div><strong>${cart.state.priceTotal}</strong></div>
          </div>
          <WideButton onClick={editOrder}>EDIT ORDER</WideButton>
          <WideButton type="submit">PLACE ORDER</WideButton>
        </section>
      </form>
    </Fragment>
  );

  return (
    <div className="page">
      {cart.state.itemTotal < 1 
        ? <h1>You have nothing to checkout.</h1> 
        : checkout
      }
    </div>
  );
}
