import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NavLink.module.css';

export default function NavLink(props) {
  const { route, onClick, children } = props;

  return (
    <Link to={route} onClick={onClick} className={styles.navLink}>
      {children}
    </Link>
  );
}
