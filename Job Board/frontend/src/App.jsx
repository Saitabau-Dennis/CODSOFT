import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from './pages/EmployerDashboard';

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<HomePage />} /> 
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/candidate/*" element={<CandidateDashboard />} />
        <Route path="/employer/*" element={<EmployerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;