import React from 'react';

import styles from './Button.module.css';

export default function Button(props) {
  const { children, large } = props;

  let style = styles.button;
  if (large) style = `${styles.button} ${styles.buttonLarge}`;

  return <div className={style}>{children}</div>
}
