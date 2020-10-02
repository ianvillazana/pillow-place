import React from 'react';

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
        <TabGroup tabValue={tabValue} />
      </div>
    </div>
  );
} 
