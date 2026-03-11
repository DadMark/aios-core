import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { seedDatabase } from '@/db/seed';
import '@/styles/global.css';

seedDatabase().catch(console.error);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
