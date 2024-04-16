import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const navigation = useNavigation();
  const { isDarkTheme } = useTheme();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      console.log('Login success');
      navigation.navigate('Dashboard'); 
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#04080F' : '#A1C6EA' }]}>
      <Text style={[styles.title, { color: isDarkTheme ? '#ffffff' : '#000000' }]}>Login</Text>
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
      <TouchableOpacity 
                style={[styles.button, {

                  backgroundColor: isDarkTheme ? '#155e75' : '#3b82f6' 
                }]}
        onPress={handleLogin}
        >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.cancelButton, { backgroundColor: isDarkTheme ? '#6b7280' : '#94a3b8' }]} onPress={() => navigation.goBack()}>
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
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    // backgroundColor: '#007bff',
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

export default LoginModal;
