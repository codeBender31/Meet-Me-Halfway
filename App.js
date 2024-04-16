import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, createNavigationContainerRef } from '@react-navigation/native';
//import { createNavigationContainerRef } from '@react-navigation/native';
import ModalStackScreen from './navigation/ModalStackScreen';
import { ThemeProvider, useTheme } from './context/ThemeContext'; // Adjust the path as necessary
import { AuthProvider } from './context/AuthContext';
import { LogBox } from 'react-native';

//ignore looping warning
LogBox.ignoreAllLogs(true);

export const navigationRef = createNavigationContainerRef();


const App = () => {
  return (
    <AuthProvider> 
      <ThemeProvider> 
        <ThemedApp />
      </ThemeProvider>
    </AuthProvider>
  );
};

const ThemedApp = () => {
  const { isDarkTheme } = useTheme();
  return (
    <NavigationContainer  
        ref={navigationRef}
        theme={isDarkTheme ? DarkTheme : DefaultTheme}
    >
      <ModalStackScreen />
    </NavigationContainer>
  );
};

export default App;

export function navigate(name, params) {
  console.log(`Attempting to navigate to ${name} with params:`, params);
  if (navigationRef.isReady()) {
    console.log(`Navigating to ${name}`);
    navigationRef.navigate(name, params);
  } else {
    console.log(`Navigation ref not ready`);
  }
}