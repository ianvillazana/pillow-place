import React from 'react';

import styles from './Tab.module.css';

export default function Tab(props) {
  const { children, selected } = props;

  let tabStyle = styles.tab;
  if (selected) tabStyle = `${styles.tab} ${styles.selected}`;

  return (
    <div className={tabStyle}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
