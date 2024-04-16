import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import LoginModal from '../screens/LoginModal';
import RegisterModal from '../screens/RegisterModal';
import FriendSearch from '../screens/FriendSearch';
import Notifications from '../screens/Notifications'

const RootStack = createStackNavigator();

function ModalStackScreen() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
      <RootStack.Screen 
        name="LoginModal" 
        component={LoginModal} 
        options={{ 
          presentation: 'modal',
          headerTitle: ''
        }}
        />
      <RootStack.Screen 
        name="RegisterModal" 
        component={RegisterModal} 
        options={{ 
          presentation: 'modal',
          headerTitle: '' 
        }} 
      />
         <RootStack.Screen 
        name="FriendSearch" 
        component={FriendSearch} 
        options={{ 
          presentation: 'modal',
          headerTitle: 'Search Friends' 
        }} 
      />

        <RootStack.Screen 
        name="Notifications" 
        component={Notifications} 
        options={{ 
          presentation: 'modal',
          headerTitle: 'Notifications' 
        }} 
      />

    </RootStack.Navigator>
  );
}

export default ModalStackScreen;
