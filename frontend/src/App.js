import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import ContactUsPage from './pages/ContactUsPage';
import FaqPage from './pages/FaqPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import ShippingPage from './pages/ShippingPage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import Footer from './components/Footer/Footer';
import { CartContext } from './context/cart-context';
import { useCart } from './hooks/useCart';
import './App.css';

export default function App() {
  const [state, open, close] = useCart();

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
      <Route path="/home" exact component={HomePage} />
      <Route path="/" exact component={HomePage} />
      <Route component={HomePage} />
    </Switch>
  );

  return (
    <CartContext.Provider value={{ state, open, close }}>
      <BrowserRouter basename="/">
        <ScrollToTop />
        <Header />
        <main>{routes}</main>
        <Footer />
      </BrowserRouter>
    </CartContext.Provider>
  );
}
