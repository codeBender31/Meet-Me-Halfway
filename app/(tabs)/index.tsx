import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import EditScreenInfo from '@/components/EditScreenInfo';
import { View } from '@/components/Themed';

export default function TabOneScreen() {
  const { theme, toggleTheme } = useTheme(); 

  const containerStyle = {
    ...styles.container,
    backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5', // Dark mode: dark background, Light mode: light background
  };

  const buttonStyle = {
    ...styles.toggleButton,
    backgroundColor: theme === 'dark' ? '#444' : '#007bff', 
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meet Me Halfway</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/app/(tabs)/index.tsx" /> */}

      {/* Theme Toggle Button */}
      <TouchableOpacity onPress={toggleTheme} style={buttonStyle}>
        <Text style={styles.toggleButtonText}>Toggle Theme</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  toggleButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
