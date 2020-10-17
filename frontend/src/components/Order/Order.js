import React from 'react';

import WideButton from '../WideButton/WideButton';
import styles from './Order.module.css';

export default function Order(props) {
  const { order } = props;

  return (
    <div className={styles.order}>
      <h5>Order ID: {order.id}</h5>
      <h6>{order.dateTime}</h6>
      {order.items.map((item, index) => (
        <div className={styles.item} key={index}>
          <div>
            <div>{item.name}</div>
            <div className={styles.itemSKU}>
              {item.sku}
            </div>
          </div>
          <div>
            {item.count} &times; {item.price}
          </div>
      </div>
      ))}
      <div className={styles.item}>
        <div>Shipping</div>
        <div>FREE</div>
      </div>
      <div className={styles.item}>
        <div>Total</div>
        <div><strong>${order.totalPrice}</strong></div>
      </div>
      <WideButton>Cancel Order</WideButton>
    </div>
  );
}
