import React, { useLayoutEffect, useCallback } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

function AboutScreen({ navigation }) {

  const { isDarkTheme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const memoizedToggleTheme = useCallback(toggleTheme, []);
  console.log('auth about');
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Switch value={isDarkTheme} onValueChange={memoizedToggleTheme} style={{ marginLeft: 10 }} />
      ),
      headerRight: () => (
        isAuthenticated ? (
          <View style={{ flexDirection: 'row', paddingRight: 10 }}>
            <Text>Welcome back!</Text>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', paddingRight: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('LoginModal')} style={[styles.button, isDarkTheme ? styles.dark : styles.light]}>
              <Text style={[styles.buttonText, isDarkTheme ? styles.textDark : styles.textLight]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterModal')} style={[styles.button, isDarkTheme ? styles.dark : styles.light, { marginLeft: 8 }]}>
              <Text style={[styles.buttonText, isDarkTheme ? styles.textDark : styles.textLight]}>Register</Text>
            </TouchableOpacity>
          </View>
        )
      ),
    });
  }, [navigation, isDarkTheme, memoizedToggleTheme, isAuthenticated]); // Ensure isAuthenticated is in the dependency array to re-evaluate when auth state changes.
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Messaging!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  dark: {
    backgroundColor: '#666',
  },
  light: {
    backgroundColor: '#ddd',
  },
  textDark: {
    color: '#fff',
  },
  textLight: {
    color: '#000',
  },
});

export default AboutScreen;
