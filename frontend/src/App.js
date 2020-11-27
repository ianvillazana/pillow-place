import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import AuthForm from './components/AuthForm/AuthForm';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import Footer from './components/Footer/Footer';
import Spinner from './components/Spinner/Spinner';
import { AuthContext } from './context/auth-context';
import { CartContext } from './context/cart-context';
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';
import './App.css';

// Lazy loading routes
const AccountPage = React.lazy(() => import('./pages/AccountPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const ContactUsPage = React.lazy(() => import('./pages/ContactUsPage'));
const FaqPage = React.lazy(() => import('./pages/FaqPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const ProductPage = React.lazy(() => import('./pages/ProductPage'));
const ReturnPolicyPage = React.lazy(() => import('./pages/ReturnPolicyPage'));
const ShippingPage = React.lazy(() => import('./pages/ShippingPage'));
const ShopPage = React.lazy(() => import('./pages/ShopPage'));

export default function App() {
  const auth = useAuth();
  const cart = useCart();

  // Close authForm and cart when browser back button is pressed.
  useEffect(() => {
    window.onpopstate = () => {
      auth.close();
      cart.close();
    }
  });

  // Disable scrolling of the body while authForm or cart is open.
  if (auth.state.show || cart.state.show) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  const routes = (
    <Switch>
      {auth.state.token && (
        <Route path="/account" exact component={AccountPage} />
      )}
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
      <Route component={NotFoundPage} />
    </Switch>
  );

  return (
    <AuthContext.Provider value={auth}>
      <CartContext.Provider value={cart}>
        <BrowserRouter basename="/">
          <ScrollToTop />
          <AuthForm />
          <Cart />
          <Header />
          <main>
            <Suspense fallback={<div className="page"><Spinner /></div>}>
              {routes}
            </Suspense>
          </main>
          <Footer />
        </BrowserRouter>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
