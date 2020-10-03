import React from 'react';

import styles from './WideButton.module.css';

export default function WideButton(props) {
  return (
    <button className={styles.wideButton}>{props.children}</button>
  );
}
