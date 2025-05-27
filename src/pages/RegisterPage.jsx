import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { register } from '../utils/network-data';
import { LocaleContext } from '../contexts/LocaleContext';
import { AuthContext } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';

function RegisterPage({ onLoginClick }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const { texts, locale } = useContext(LocaleContext);
  const { isLoading, setIsLoading } = useContext(AuthContext);
  const { showSuccess, showError } = useNotification();

  const onNameChange = (e) => {
    setName(e.target.value);
    // Clear error when user types
    if (errors.name) {
      setErrors({ ...errors, name: '' });
    }
  };

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

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Clear error when user types
    if (errors.confirmPassword) {
      setErrors({ ...errors, confirmPassword: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = texts.nameRequired;
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = texts.emailRequired;
      isValid = false;
    }

    if (!password) {
      newErrors.password = texts.passwordRequired;
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = texts.passwordMinLength;
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = texts.passwordMatch;
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
      const { error, message } = await register({ name, email, password });
      
      if (error) {
        showError(message);
      } else {
        showSuccess(message);
        // Redirect to login after successful registration
        onLoginClick();
      }
    } catch (error) {
      console.error('Registration error:', error);
      showError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="register-page">
      <h2>{texts.registerTitle}</h2>
      <form className="register-form" onSubmit={onSubmit}>
        <div className="input-group">
          <label htmlFor="name">{texts.name}</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={onNameChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="email">{texts.email}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onEmailChange}
            className={errors.email ? 'input-error' : ''}
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
            autoComplete="new-password"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">{texts.confirmPassword}</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            className={errors.confirmPassword ? 'input-error' : ''}
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit" className="register-button">
          {texts.registerButton}
        </button>
      </form>
      <p className="login-link">
        {locale === 'id' ? 'Sudah punya akun?' : 'Already have an account?'}{' '}
        <button type="button" onClick={onLoginClick} className="link-button">
          {texts.loginButton}
        </button>
      </p>
    </section>
  );
}

RegisterPage.propTypes = {
  onLoginClick: PropTypes.func.isRequired
};

export default RegisterPage;

