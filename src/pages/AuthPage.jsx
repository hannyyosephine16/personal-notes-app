import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ThemeToggle from '../components/ThemeToggle';
import LocaleToggle from '../components/LocaleToggle';

function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-toggle-container">
        <ThemeToggle />
        <LocaleToggle />
      </div>
      <div className="auth-container">
        {showLogin ? (
          <LoginPage onRegisterClick={handleRegisterClick} />
        ) : (
          <RegisterPage onLoginClick={handleLoginClick} />
        )}
      </div>
    </div>
  );
}

export default AuthPage;