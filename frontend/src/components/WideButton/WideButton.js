import React from 'react';

import styles from './WideButton.module.css';

export default function WideButton(props) {
  const { onClick, children } = props;

  return (
    <button className={styles.wideButton} onClick={onClick}>
      {children}
    </button>
  );
}
