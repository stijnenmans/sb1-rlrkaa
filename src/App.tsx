import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import LetterPage from './pages/LetterPage';
import LikedPropertiesPage from './pages/LikedPropertiesPage';
import TipsPage from './pages/TipsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/liked" element={<LikedPropertiesPage />} />
          <Route path="/dashboard/tips" element={<TipsPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/dashboard/letter/:propertyId" element={<LetterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;