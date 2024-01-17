// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import SubscriptionPage from './components/SubscriptionPage';
import Success from './components/Success';
import Failure from './components/Failure';

const App: React.FC = () => {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<SubscriptionPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;
