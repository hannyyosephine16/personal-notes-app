import React, { useContext } from 'react';
import { LocaleContext } from '../contexts/LocaleContext';

function LocaleToggle() {
  const { locale, toggleLocale, texts } = useContext(LocaleContext);

  return (
    <button
      onClick={toggleLocale}
      title={texts.changeLanguage}
      className="locale-toggle"
      aria-label={texts.changeLanguage}
    >
      {locale === 'id' ? '🇬🇧' : '🇮🇩'}
    </button>
  );
}

export default LocaleToggle;