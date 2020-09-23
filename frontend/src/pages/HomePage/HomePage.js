import React from 'react';

import Button from '../../components/Button/Button';
import Product from '../../components/Product/Product';
import collection from '../../utils/collection';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.home}>
      <section className={styles.landing}>
        <div className={styles.landingContent}>
          <h1>A PLACE TO LAY YOUR HEAD</h1>
          <h2>YOUR SOFT LANDING AWAITS</h2>
          <Button large>SHOP NOW</Button>
        </div>
      </section>
      <section className={styles.returnPolicy}>
        <h4>14-DAY RETURN POLICY</h4>
        <p>
          We offer a 14-day free return guarantee! You can return any product
          you purchased from us online for up to 14 days from the date of 
          receiving your order. You just have to pay for return shipping fees.
        </p>
        <a href="#">CLICK HERE FOR THE FULL DETAILS</a>
      </section>
      <section className={styles.featured}>
        <div className={styles.featuredButton}>
          <p>PILLOWS FOR ALL SLEEPERS</p>
        </div>
      </section>
      <section className={styles.popular}>
        <h4>POPULAR PICKS</h4>
        <div className={styles.products}>
          <Product item={collection.Aquagel} />
          <Product item={collection.BioSoy} />
          <Product item={collection.ComfortContour} />
          <Product item={collection.HeavenlyTouch} />
          <Product item={collection.GelCool} />
          <Product item={collection.LuxeSilk} />
        </div>
      </section>
    </div>
  );
}
