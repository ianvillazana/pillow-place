import React from 'react';

import styles from './Button.module.css';

export default function Button(props) {
  const { children, large, onClick } = props;

  let style = styles.button;
  if (large) style = `${styles.button} ${styles.buttonLarge}`;

  return <button className={style} onClick={onClick}>{children}</button>;
}
