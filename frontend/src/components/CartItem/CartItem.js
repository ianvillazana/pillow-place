import React from 'react';

import styles from './CartItem.module.css';

export default function CartItem(props) {
  const { item, add, remove } = props;

  return (
    <div className={styles.cartItem}>
      <img src={item.image} alt={item.name} />
      <div className={styles.info}>
        <div>{item.name}</div>
        <div>${item.price}</div>
        <div className={styles.sku}>SKU: {item.sku}</div>
      </div>
      <div className={styles.quantity}>
        <button onClick={add}>+</button>
        <div>{item.count}</div>
        <button onClick={remove}>-</button>
      </div>
    </div>
  );
}
