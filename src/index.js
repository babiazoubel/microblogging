import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" strict element={<App />} />
      <Route path="/profile" strict element={<Profile />} />
    </Routes>
  </BrowserRouter>
);
