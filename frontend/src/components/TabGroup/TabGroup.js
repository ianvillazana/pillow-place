import React from 'react';

import Tab from '../Tab/Tab';
import styles from './TabGroup.module.css';

const tabs = {
  "SIDE": "/shop/side-sleeper",
  "BACK": "/shop/back-sleeper",
  "MIXED": "/shop/mixed-sleeper",
  "ALL": "/shop/all"
};

export default function TabGroup(props) {
  const { tabValue } = props;

  return (
    <div className={styles.tabGroup}>
      {Object.keys(tabs).map((tab, index) => (
        <div className={styles.tab} key={index}>
          <Tab selected={index === tabValue} route={tabs[tab]}>{tab}</Tab>
        </div>
      ))}
    </div>
  );
}
