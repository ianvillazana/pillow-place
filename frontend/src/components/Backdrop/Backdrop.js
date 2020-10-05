import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Backdrop.module.css';

export default function Backdrop(props) {
  const { onClick } = props;

  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};
