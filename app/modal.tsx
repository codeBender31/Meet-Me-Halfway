import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

// Assume useAuth hook now includes a register method
import { useAuth } from './context/AuthContext';

export default function ModalScreen() {
  // States for registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { register } = useAuth();

  const handleRegister = async () => {
    try {
      await register(name, email, password);
      console.log('register success');
      // Handle successful registration here
      // For example, you might want to navigate to a different screen or show a success message
    } catch (error) {
      // Handle registration errors here
      // For example, showing an error message to the user
      console.error(error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholderTextColor="#888"
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput
        placeholderTextColor="#888"
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholderTextColor="#888"
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Light gray background
  },
  title: {
    color: '#64748b',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 50,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007b9f',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
