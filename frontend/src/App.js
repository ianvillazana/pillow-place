import React, { Fragment } from 'react';

import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import './App.css';

export default function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <HomePage />
      </main>
      <Footer />
    </Fragment>
  );
}
