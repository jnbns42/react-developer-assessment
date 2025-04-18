import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './mock';
import './styles/index.css';
import { BrowserRouter } from "react-router";
/**
 * This file can be ignored, please work in ./components/App.tsx
 */
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
