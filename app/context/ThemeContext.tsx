import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

// Define the shape of the context data
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Define the shape of the provider props
interface ThemeProviderProps {
  children: ReactNode;
}

// Create a context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light', // This could also start as useSystemColorScheme() for a dynamic initial theme
  toggleTheme: () => {},
});

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = useSystemColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(systemTheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    // Optionally sync the theme with the system theme on app start or when it changes
    if (systemTheme) {
      setTheme(systemTheme);
    }
  }, [systemTheme]);

  const toggleTheme = () => {
    setTheme(currentTheme => currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
