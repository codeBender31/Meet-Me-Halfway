import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
//import * as SecureStore from 'expo-secure-store';
// Make sure to import your API method for signIn
import { register as apiRegister, login as apiLogin, logout as apiLogout } from '../../api';




interface AuthContextProps {
  children: ReactNode;
}

interface AuthState {
  userToken: string | null;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  register: (name:string, email: string, password: string) => Promise<void>; 
}

export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  signIn: async () => {},
  register: async () => {},
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


  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      
      // Call the register function from your API utility file
      const response = await apiRegister({ name, email, password });
      console.log('User token from API is: ' + JSON.stringify(response.data));
      // Assuming the API returns a token upon successful registration
      const token = response.data.token; // Adjust this line based on your actual API response
      setUserToken(token);
 //     await SecureStore.setItemAsync('userToken', token);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to register');
    }
  };



  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const response = await apiLogin({ email, password });
      const token = response.data.token; // Adjust according to your API response structure
      setUserToken(token);
 //     await SecureStore.setItemAsync('userToken', token);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to sign in');
    }
  };


  const signOut = () => {
    setUserToken(null);
    // SecureStore.deleteItemAsync('userToken');
  };

  useEffect(() => {
    // SecureStore.getItemAsync('userToken').then((token) => {
    //   if (token) {
    //     setUserToken(token);
    //   }
    // });
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  );
};
