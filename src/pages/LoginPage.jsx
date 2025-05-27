import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { login } from '../utils/network-data';
import { LocaleContext } from '../contexts/LocaleContext';
import { AuthContext } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';

function LoginPage({ onRegisterClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const { texts, locale } = useContext(LocaleContext);
  const { onLoginSuccess, isLoading, setIsLoading } = useContext(AuthContext);
  const { showSuccess, showError } = useNotification();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user types
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    // Clear error when user types
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = texts.emailRequired;
      isValid = false;
    }

    if (!password) {
      newErrors.password = texts.passwordRequired;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const { error, data, message } = await login({ email, password });
      
      if (error) {
        showError(message);
      } else {
        await onLoginSuccess(data);
        showSuccess(texts.loginButton + ' ' + texts.loginButton.toLowerCase());
      }
    } catch (error) {
      console.error('Login error:', error);
      showError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="login-page">
      <h2>{texts.loginTitle}</h2>
      <form className="login-form" onSubmit={onSubmit}>
        <div className="input-group">
          <label htmlFor="email">{texts.email}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onEmailChange}
            className={errors.email ? 'input-error' : ''}
            autoComplete="email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="password">{texts.password}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
            className={errors.password ? 'input-error' : ''}
            autoComplete="current-password"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <button type="submit" className="login-button">
          {texts.loginButton}
        </button>
      </form>
      <p className="register-link">
        {locale === 'id' ? 'Belum punya akun?' : 'Don\'t have an account?'}{' '}
        <button type="button" onClick={onRegisterClick} className="link-button">
          {texts.registerButton}
        </button>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  onRegisterClick: PropTypes.func.isRequired
};

export default LoginPage;