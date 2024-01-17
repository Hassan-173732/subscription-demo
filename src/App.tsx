// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import SubscriptionPage from './components/SubscriptionPage';

const App: React.FC = () => {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<SubscriptionPage />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;
