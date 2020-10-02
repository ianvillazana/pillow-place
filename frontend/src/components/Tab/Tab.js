import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Tab.module.css';

export default function Tab(props) {
  const { children, selected, route } = props;

  let tabStyle = styles.tab;
  if (selected) tabStyle = `${styles.tab} ${styles.selected}`;

  return (
    <div className={tabStyle}>
      <Link to={route}>{children}</Link>
    </div>
  );
}
