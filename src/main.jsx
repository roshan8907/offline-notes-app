import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './style.css';
// Register the service worker in production/preview, not during development.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js').catch((e) => console.error('Service worker registration failed:', e)));
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
