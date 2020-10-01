import React, { useState, Children } from 'react';

import Tab from '../Tab/Tab';
import styles from './TabGroup.module.css';

export default function TabGroup(props) {
  const { children, defaultValue } = props;

  const [value, setValue] = useState(defaultValue ? defaultValue : 0);

  return (
    <div className={styles.tabGroup}>
      {Children.map(children, (child, index) => (
        <div 
          className={styles.tab} 
          onClick={() => setValue(index)}
        >
          <Tab selected={index === value}>{child}</Tab>
        </div>
      ))}
    </div>
  );
}
