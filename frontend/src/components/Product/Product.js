import React from 'react';

import styles from './Product.module.css';

export default function Product(props) {
  const { image, name, price } = props.item;

  return (
    <div className={styles.product}>
      <img src={image} alt={name} />
      <h6>{name}</h6>
      <p>${price}</p>
    </div>
  );
}
