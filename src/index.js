import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import { TweetContext } from './contexts/TweetContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <TweetContext.Provider>
      <Routes>
        <Route path="/" strict element={<App />} />
        <Route path="/profile" strict element={<Profile />} />
      </Routes>
    </TweetContext.Provider>
  </BrowserRouter>
);
