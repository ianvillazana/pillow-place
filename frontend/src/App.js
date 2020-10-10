import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import AuthForm from './components/AuthForm/AuthForm';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import ContactUsPage from './pages/ContactUsPage';
import FaqPage from './pages/FaqPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import ShippingPage from './pages/ShippingPage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import Footer from './components/Footer/Footer';
import { AuthContext } from './context/auth-context';
import { CartContext } from './context/cart-context';
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';
import './App.css';

export default function App() {
  const [authState, authOpen, authClose] = useAuth();
  const [
    cartState, cartOpen, cartClose, addItem, removeItem, completeOrder, clear
  ] = useCart();

  // Close authForm and cart when browser back button is pressed.
  useEffect(() => {
    window.onpopstate = () => {
      authClose();
      cartClose();
    }
  });

  // Disable scrolling of the body while authForm or cart is open.
  if (authState.show || cartState.show) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  const routes = (
    <Switch>
      <Route path="/contact-us" exact component={ContactUsPage} />
      <Route path="/faq" exact component={FaqPage} />
      <Route path="/return-policy" exact component={ReturnPolicyPage} />
      <Route path="/shipping" exact component={ShippingPage} />
      <Route path="/shop/side-sleeper" exact render={() => <ShopPage tabValue={0} />} />
      <Route path="/shop/back-sleeper" exact render={() => <ShopPage tabValue={1} />} />
      <Route path="/shop/mixed-sleeper" exact render={() => <ShopPage tabValue={2} />} />
      <Route path="/shop/all" exact render={() => <ShopPage tabValue={3} />} />
      <Route path="/shop" exact render={() => <ShopPage tabValue={3} />} />
      <Route path="/shop/products/:id" exact component={ProductPage} />
      <Route path="/checkout" exact component={CheckoutPage} />
      <Route path="/home" exact component={HomePage} />
      <Route path="/" exact component={HomePage} />
      <Route component={HomePage} />
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={{ state: authState, open: authOpen, close: authClose }}
    >
      <CartContext.Provider 
        value={{ 
          state: cartState, open: cartOpen, close: cartClose, 
          addItem, removeItem, completeOrder, clear 
        }}
      >
        <BrowserRouter basename="/">
          <ScrollToTop />
          <AuthForm />
          <Cart />
          <Header />
          <main>{routes}</main>
          <Footer />
        </BrowserRouter>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
