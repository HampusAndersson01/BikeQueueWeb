import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BikeQueueProvider } from './components/BikeQueueContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BikeQueueProvider initialDuration={300}>
    <App />
    </BikeQueueProvider>
  </React.StrictMode>
);
