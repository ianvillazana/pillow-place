import React from 'react';

import styles from './IconButton.module.css';

export default function IconButton(props) {
  const { icon } = props;

  return (
    <div className={styles.iconButton}>
      <img src={icon} alt="icon" />
    </div>
  );
}
