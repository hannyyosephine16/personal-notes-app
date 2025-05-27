import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/style.css';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <NotificationProvider>
        <ThemeProvider>
          <LocaleProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </LocaleProvider>
        </ThemeProvider>
      </NotificationProvider>
    </ErrorBoundary>
  </React.StrictMode>
);