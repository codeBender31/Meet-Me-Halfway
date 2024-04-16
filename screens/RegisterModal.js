import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; // Import useTheme

function RegisterModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigation = useNavigation(); // Use useNavigation hook for navigation
  const { isDarkTheme } = useTheme(); // Use the theme context to check if dark theme is active

  const handleRegister = async () => {
    try {
      await register(name, email, password);
      console.log('Register success');
      // Optionally navigate or provide feedback
    } catch (error) {
      console.error('Register error', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#04080F' : '#A1C6EA'  }]}>
      <Text style={[styles.title, { color: isDarkTheme ? '#ffffff' : '#000000' }]}>Register</Text>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkTheme ? '#d1d5db' : '#fff' }]}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor="#888"
      />
      <TextInput
        style={[styles.input, { backgroundColor: isDarkTheme ? '#d1d5db' : '#fff' }]}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, { backgroundColor: isDarkTheme ? '#d1d5db' : '#fff' }]}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry={true}
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: isDarkTheme ? '#166534' : '#0d9488' }]} onPress={handleRegister}>
      <Text style={[styles.buttonText]}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: isDarkTheme ? '#6b7280' : '#94a3b8' }]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    paddingTop: 20, 
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RegisterModal;
