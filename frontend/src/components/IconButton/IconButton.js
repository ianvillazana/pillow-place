import React from 'react';

import styles from './IconButton.module.css';

export default function IconButton(props) {
  const { icon, onClick } = props;

  return (
    <div className={styles.iconButton} onClick={onClick}>
      <img src={icon} alt="icon" />
    </div>
  );
}
