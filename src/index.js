import React from 'react';
import { createRoot } from 'react-dom/client';
import RouterIndex from './Components/Router'
import styles from './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className={styles.root}>
      <RouterIndex />
    </div>
  </React.StrictMode>,
);