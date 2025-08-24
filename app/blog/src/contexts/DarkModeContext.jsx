import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference, default to system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      console.log('Dark mode enabled - added dark class');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Light mode enabled - removed dark class');
    }
    
    // Log current classes on document element
    console.log('Document element classes:', document.documentElement.classList.toString());
    console.log('Current dark mode state:', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    console.log('Toggling dark mode from:', isDarkMode, 'to:', !isDarkMode);
    setIsDarkMode(prev => !prev);
  };

  const value = {
    isDarkMode,
    toggleDarkMode,
  };

  console.log('DarkModeProvider rendered with isDarkMode:', isDarkMode);

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};
