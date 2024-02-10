// app/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthState {
  userToken: string | null;
}

interface AuthContextType extends AuthState {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
}

const defaultContext: AuthState = {
  userToken: null,
};

export const AuthContext = createContext<AuthContextType>({
    userToken: null,
    signIn: async () => { /* This function now correctly returns a Promise<void> */ },
    signOut: () => {},
  });
  

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };


export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  // signIn now matches the signature in AuthContextType
  const signIn = async (email: string, password: string): Promise<void> => {
    // Here you would replace this with your actual authentication logic
    // For example, authenticate against a backend and retrieve a token on success
    // This is a placeholder to illustrate the function signature
    try {
      // Simulate API call and token retrieval
      const token = 'dummy_token'; // This should be the token you get back from your auth API
      setUserToken(token);
      await SecureStore.setItemAsync('userToken', token);
    } catch (error) {
      // Handle errors, such as incorrect credentials or network issues
      console.error(error);
      throw new Error('Failed to sign in');
    }
  };

  const signOut = () => {
    setUserToken(null);
    SecureStore.deleteItemAsync('userToken');
  };

  useEffect(() => {
    // Check for the token in storage then load user
    SecureStore.getItemAsync('userToken').then((token) => {
      if (token) {
        setUserToken(token);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
