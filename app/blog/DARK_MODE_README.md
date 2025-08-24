# Dark Mode Implementation

This blog now supports dark mode! Here's what was implemented:

## Features

- **Automatic System Preference Detection**: The app automatically detects your system's color scheme preference
- **Persistent Storage**: Your dark mode preference is saved in localStorage
- **Smooth Transitions**: All color changes have smooth transitions for a better user experience
- **Toggle Button**: A sun/moon toggle button in the navbar to switch between light and dark modes

## How It Works

### Dark Mode Context
- `DarkModeContext.jsx`: Manages the global dark mode state
- Automatically detects system preference on first load
- Saves user preference to localStorage
- Applies `dark` class to the document root when enabled

### Toggle Component
- `DarkModeToggle/index.jsx`: Sun/moon toggle button
- Located in the navbar
- Shows sun icon in dark mode, moon icon in light mode
- Hover effects and smooth transitions

### Styling
- Uses Tailwind CSS `dark:` prefix for dark mode styles
- Consistent color scheme across all components:
  - Light mode: White backgrounds with dark text
  - Dark mode: Dark gray backgrounds with light text
- All components have been updated with dark mode support

## Components Updated

- ✅ Navbar
- ✅ Footer
- ✅ Article Container
- ✅ Project Cards
- ✅ Contact Page
- ✅ Projects Page
- ✅ Articles Page
- ✅ Article Display (with markdown support)
- ✅ Tags Handler
- ✅ Loading Component
- ✅ Error Component
- ✅ 404 Page

## Color Scheme

### Light Mode
- Background: White (`bg-white`)
- Text: Black/Dark Gray (`text-black`, `text-gray-700`)
- Accents: Secondary colors from your existing theme

### Dark Mode
- Background: Dark Gray (`dark:bg-gray-900`)
- Text: Light Gray/White (`dark:text-gray-100`, `dark:text-white`)
- Accents: Blue tones for links (`dark:text-blue-400`)

## Usage

1. **Automatic**: The app will automatically match your system preference
2. **Manual Toggle**: Click the sun/moon icon in the navbar to switch modes
3. **Persistent**: Your choice is remembered across browser sessions

## Technical Details

- **Tailwind Config**: `darkMode: 'class'` enabled
- **CSS Transitions**: Smooth color transitions on all elements
- **Context API**: React Context for state management
- **localStorage**: Persistent preference storage
- **System API**: `window.matchMedia` for system preference detection

## Future Enhancements

- Add more color themes beyond just light/dark
- Implement automatic switching based on time of day
- Add keyboard shortcuts for toggling
- Consider adding high contrast mode for accessibility
