import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAccessToken, getUserLogged, putAccessToken } from '../utils/network-data';
import { useNotification } from './NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const { showError } = useNotification();

  useEffect(() => {
    // Check if user is already logged in
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const { error, data } = await getUserLogged();
        if (!error) {
          setAuthUser(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
        setInitializing(false);
      }
    };

    if (getAccessToken()) {
      fetchUserData();
    } else {
      setInitializing(false);
      setIsLoading(false);
    }
  }, []);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    setIsLoading(true);
    
    try {
      const { error, data } = await getUserLogged();
      if (!error) {
        setAuthUser(data);
      } else {
        showError('Failed to get user data');
      }
    } catch (error) {
      console.error('Error fetching user data after login:', error);
      showError('An error occurred while getting user data');
    } finally {
      setIsLoading(false);
    }
  }

  function onLogout() {
    setAuthUser(null);
    putAccessToken('');
  }

  if (initializing) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <AuthContext.Provider value={{ authUser, isLoading, setIsLoading, onLoginSuccess, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };