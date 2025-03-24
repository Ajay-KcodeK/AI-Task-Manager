import React from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate  } from 'react-router-dom';
import LandingPage from './pages/LandingPage ';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './services/PrivateRoute';

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
<Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUpPage />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* 404 Fallback Route */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>

  );
}

export default App;
