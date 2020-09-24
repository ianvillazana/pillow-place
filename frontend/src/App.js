import React, { Fragment } from 'react';

import HomePage from './pages/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import './App.css';

export default function App() {
  return (
    <Fragment>
      <main>
        <HomePage />
      </main>
      <Footer />
    </Fragment>
  );
}
