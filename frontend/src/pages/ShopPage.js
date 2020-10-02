import React from 'react';
import { Link } from 'react-router-dom';

import TabGroup from '../components/TabGroup/TabGroup';
import Product from '../components/Product/Product';
import collection from '../utils/collection';
import banner from '../images/homepage/shop-banner.jpg';
import styles from './ShopPage.module.css';

const headers = ["Side Sleeper", "Back Sleeper", "Mixed Sleeper", "Shop All"];

export default function ShopPage(props) {
  // value indicates which tab is selected
  const { tabValue } = props;

  const header = headers[tabValue];

  return (
    <div className={styles.shop}>
      <div className={styles.banner}>
        <img src={banner} alt="banner" />
      </div>
      <div className={styles.tabs}>
        <TabGroup tabValue={tabValue} />
      </div>
      <section className="pillows">
        <h4>{header}</h4>
        <div className="products max-width">
          {Object.keys(collection).map((item, index) => (
            (collection[item].type === header || header === "Shop All") &&
              <Link to={`/shop/products/${item}`} key={index}>
                <Product item={collection[item]} />
              </Link>
          ))}
        </div>
      </section>
    </div>
  );
} 
