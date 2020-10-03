import React from 'react';

import WideButton from '../components/WideButton/WideButton';
import collection from '../utils/collection';
import styles from './ProductPage.module.css';

export default function ProductPage(props) {
  const item = collection[props.match.params.id];

  return (
    <div className="page">
      <section className={`${styles.grid} max-width`}>
        <div className={styles.gridItem}>
          <img src={item.image} alt={item.name} />
        </div>
        <div className={styles.gridItem}>
          <h2>{item.name}</h2>
          <p className="caption-2">{item.type}</p>
          <h3>${item.price}</h3>
          <p className={styles.sku}>SKU: {item.sku}</p>
          <WideButton>ADD TO CART</WideButton>
        </div>
      </section>
      <section className={`${styles.information} max-width`}>
        <h5>About This Product</h5>
        <p>{item.description}</p>
      </section>
      <section className={`${styles.information} max-width`}>
        <h5>Specs and Features</h5>
        <p><strong>Dimensions: </strong>{item.dimensions}</p>
        <ul className="unordered-list">
          {item.features.map((feature, index) => (
            <li key={index}><p>{feature}</p></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
