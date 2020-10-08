import React from 'react';

import styles from './WideButton.module.css';

export default function WideButton(props) {
  const { type, onClick, disabled, className, children } = props;

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.wideButton} ${className}`} 
    >
      {children}
    </button>
  );
}
