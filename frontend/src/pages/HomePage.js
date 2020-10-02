import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/Button/Button';
import Product from '../components/Product/Product';
import collection from '../utils/collection';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.home}>
      <section className={styles.landing}>
        <div className={styles.landingContent}>
          <h1>A PLACE TO LAY YOUR HEAD</h1>
          <h2>YOUR SOFT LANDING AWAITS</h2>
          <Link to="/shop/all"><Button large>SHOP NOW</Button></Link>
        </div>
      </section>
      <section className={styles.returnPolicy}>
        <h4>14-DAY RETURN POLICY</h4>
        <p>
          We offer a 14-day free return guarantee! You can return any product
          you purchased from us online for up to 14 days from the date of 
          receiving your order. You just have to pay for return shipping fees.
        </p>
        <a href="/">CLICK HERE FOR THE FULL DETAILS</a>
      </section>
      <section className={styles.featured}>
        <div className={styles.featuredButton}>
          <p>PILLOWS FOR ALL SLEEPERS</p>
        </div>
      </section>
      <section className="pillows">
        <h4>POPULAR PICKS</h4>
        <div className="products max-width">
          <Link to="/shop/products/Aquagel">
            <Product item={collection.Aquagel} />
          </Link>
          <Link to="/shop/products/BioSoy">
            <Product item={collection.BioSoy} />
          </Link>
          <Link to="/shop/products/ComfortContour">
            <Product item={collection.ComfortContour} />
          </Link>
          <Link to="/shop/products/HeavenlyTouch">
            <Product item={collection.HeavenlyTouch} />
          </Link>
          <Link to="/shop/products/GelCool">
            <Product item={collection.GelCool} />
          </Link>
          <Link to="/shop/products/LuxeSilk">
            <Product item={collection.LuxeSilk} />
          </Link>
        </div>
      </section>
    </div>
  );
}
