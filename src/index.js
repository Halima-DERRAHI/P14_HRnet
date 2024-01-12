import React from 'react';
import { createRoot } from 'react-dom/client';
import store from './Components/Store/store';
import { Provider } from 'react-redux';
import RouterIndex from './Components/Router/index';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterIndex />
      </Provider>
  </React.StrictMode>
);