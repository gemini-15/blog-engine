import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { BsSun, BsMoon } from 'react-icons/bs';

const DarkModeToggle = () => {
  try {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    console.log('DarkModeToggle rendered with isDarkMode:', isDarkMode);

    const handleClick = () => {
      console.log('DarkModeToggle clicked, current state:', isDarkMode);
      toggleDarkMode();
    };

    // Debug: Check if dark class is on document
    const hasDarkClass = document.documentElement.classList.contains('dark');
    console.log('Document has dark class:', hasDarkClass);

    return (
      <div className="flex flex-col items-center space-y-2">
        <button
          onClick={handleClick}
          className={`m-3 p-1.5 rounded-md transition-all duration-300 border-2 ${
            isDarkMode 
              ? 'bg-yellow-100 border-yellow-400 hover:bg-yellow-200' 
              : 'bg-gray-100 border-gray-400 hover:bg-gray-200'
          }`}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <div className="flex items-center space-x-2">
            {isDarkMode ? (
              <BsSun className="w-3 h-3 text-yellow-600" />
            ) : (
              <BsMoon className="w-3 h-3 text-gray-600" />
            )}
            {/* <span className={`text-sm font-medium ${
              isDarkMode ? 'text-yellow-700' : 'text-gray-700'
            }`}>
              {isDarkMode ? 'Light' : 'Dark'}
            </span> */}
          </div>
        </button>
        
        {/* Debug info */}
        {/* <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          <div>State: {isDarkMode ? 'Dark' : 'Light'}</div>
          <div>Class: {hasDarkClass ? 'dark' : 'none'}</div>
        </div> */}
      </div>
    );
  } catch (error) {
    console.error('Error in DarkModeToggle:', error);
    return (
      <div className="p-2 text-red-500 text-xs border border-red-300 rounded">
        Error: {error.message}
      </div>
    );
  }
};

export default DarkModeToggle;
