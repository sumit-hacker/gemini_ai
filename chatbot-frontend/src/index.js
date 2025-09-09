
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { CssBaseline } from '@mui/material';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);

// Uncomment below to enable service worker and web vitals
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';
// serviceWorkerRegistration.unregister();
// reportWebVitals();
