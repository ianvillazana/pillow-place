import React from 'react';

import styles from './IconButton.module.css';

export default function IconButton(props) {
  const { icon, onClick, children } = props;

  return (
    <div className={styles.iconButton} onClick={onClick}>
      {!React.Children.count(children) 
        ? null 
        : <div className={styles.badge}>{children}</div>
      }
      <img src={icon} alt="icon" />
    </div>
  );
}
