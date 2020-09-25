import React, { Fragment } from 'react';

import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import FaqPage from './pages/FaqPage/FaqPage';
import Footer from './components/Footer/Footer';
import './App.css';

export default function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <FaqPage />
      </main>
      <Footer />
    </Fragment>
  );
}
