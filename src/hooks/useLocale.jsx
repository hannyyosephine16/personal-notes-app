import { useContext } from 'react';
import { LocaleContext } from '../contexts/LocaleContext';

/**
 * Custom hook to access the locale context
 * @returns {Object} The locale context containing locale, toggleLocale function, and texts
 */
function useLocale() {
  const context = useContext(LocaleContext);
  
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  
  return context;
}

export default useLocale;