import React from 'react';
import { Link } from 'react-router-dom';

import TabGroup from '../components/TabGroup/TabGroup';
import banner from '../images/homepage/shop-banner.jpg';
import styles from './ShopPage.module.css';

export default function ShopPage(props) {
  // value indicates which tab is selected
  const { tabValue } = props;

  return (
    <div className={styles.shop}>
      <div className={styles.banner}>
        <img src={banner} alt="banner" />
      </div>
      <div className={styles.tabs}>
        <TabGroup defaultValue={tabValue}>
          <Link to="/shop/side-sleeper">SIDE</Link>
          <Link to="/shop/back-sleeper">BACK</Link>
          <Link to="/shop/mixed-sleeper">MIXED</Link>
          <Link to="/shop/all">ALL</Link>
        </TabGroup>
      </div>
    </div>
  );
} 
