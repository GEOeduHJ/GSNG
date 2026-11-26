import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './book/App.jsx';
import { getBook } from './content-loader/loadBook.js';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App book={getBook()} />
  </React.StrictMode>,
);
