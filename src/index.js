import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import store from './Components/Store/store';
import { Provider } from 'react-redux';
import RouterIndex from './Components/Router/index';
import './index.css';

const Loader = lazy(() => import("./Components/Loader")); 

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback={<Loader />}>
      <Provider store={store}>
        <RouterIndex />
      </Provider>
    </React.Suspense>
  </React.StrictMode>
);