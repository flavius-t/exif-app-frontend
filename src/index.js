import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FilesProvider } from './context/FilesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FilesProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </FilesProvider>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
