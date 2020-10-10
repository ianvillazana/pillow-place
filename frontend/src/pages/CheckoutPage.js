import React, { Fragment, useContext } from 'react';

import { AuthContext } from '../context/auth-context';
import { CartContext } from '../context/cart-context';
import Input from '../components/Input/Input';
import WideButton from '../components/WideButton/WideButton';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../utils/validators';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);

  const { ...items } = cart.state.items

  const submitHandler = (event) => {
    event.preventDefault();
    
  }

  const checkout = (
    <Fragment>
      <h2>{auth.state.isLoggedIn ? "User" : "Guest"} Checkout</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <section className={styles.section}>
          <h5>Shipping Address</h5>
          <Input
            id="name"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your name."
            initialValue="Firstname Lastname"
            initialValid={true}
            onInput={() => {}}
          />
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
          <Input
            id="email"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
            initialValue="customer@mail.zzz"
            initialValid={true}
            onInput={() => {}}
          />
          {!auth.isLoggedIn && (
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
                {items[item].total} &times; {items[item].price}
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
          <WideButton onClick={cart.open}>EDIT ORDER</WideButton>
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
