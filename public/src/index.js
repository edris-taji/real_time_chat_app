/** @format */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Render the app using createRoot
const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);
