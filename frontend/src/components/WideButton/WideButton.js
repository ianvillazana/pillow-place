import React from 'react';

import styles from './WideButton.module.css';

export default function WideButton(props) {
  const { onClick, className, children } = props;

  return (
    <button className={`${styles.wideButton} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
