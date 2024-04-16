import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, View} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import DashboardScreen from '../screens/DashboardScreen';
import MeetMeScreen from '../screens/MeetMeScreen';
import MessagingScreen from '../screens/MessagingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FriendSearch from '../screens/FriendSearch';
import Notifications from '../screens/Notifications'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <Tab.Navigator
      key={isAuthenticated ? "authenticated" : "unauthenticated"} 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'About':
              iconName = focused ? 'information-circle' : 'information-circle-outline';
              break;
            case 'Dashboard':
              iconName = focused ? 'speedometer' : 'speedometer-outline'; // Example icons for Dashboard
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline'; // Example icons for Profile
              break;
            case 'Meet Me': // Add the case for Meet Me screen
              iconName = focused ? 'map' : 'map-outline'; // Using map icons for Meet Me
              break;
            default:
              iconName = 'ban'; // A default icon in case none of the above
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'dodgerblue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {!isAuthenticated ? (
        <>
          <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
              headerTitle: 'Meet Me Halfway', 
              tabBarLabel: 'Home', 
              headerTitleAlign: 'center', 
            }} 
          />
          <Tab.Screen 
            name="About" 
            component={AboutScreen}
            options={{
              headerTitle: 'About', 
              tabBarLabel: 'About', 
              headerTitleAlign: 'center', 
            }}  
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={({ navigation }) => ({
              headerTitle: 'Dashboard',
              headerTitleAlign: 'center',
              headerLeft: () =>(
                <View style= {{flexDirection: 'row', marginLeft: 10}}>
                <TouchableOpacity
                onPress={() => navigation.navigate('Notifications')}
                style={{marginLeft:10}}>
                <MaterialCommunityIcons name="bell-badge" size={25} color="#3b82f6" />
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => navigation.navigate('FriendSearch')}
                style={{marginLeft:10}}>
                <MaterialCommunityIcons name="account-search" size={25} color="#3b82f6" />
                </TouchableOpacity>
                </View>
              ),
              headerRight: () => (
                //Logout Button Placeholder
                <TouchableOpacity
                onPress={() => {signOut();}}
                style={{marginRight : 10}}>
              <MaterialIcons name="logout" size={25} color="#3b82f6"/>
              </TouchableOpacity>
              ),
              headerRightContainerStyle: {
                paddingRight: 15, 
              },
              tabBarLabel: 'Dashboard', 
            })}
          />
 

          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={({ navigation}) => ({
              headerTitle: 'Profile',
              headerTitleAlign: 'center',
              headerLeft: () =>(
              <View style= {{flexDirection: 'row', marginLeft: 10}}>
                <TouchableOpacity
                onPress={() => navigation.navigate('Notifications')}
                style={{marginLeft:10}}>
                <MaterialCommunityIcons name="bell-badge" size={25} color="#3b82f6" />
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => navigation.navigate('FriendSearch')}
                style={{marginLeft:10}}>
                <MaterialCommunityIcons name="account-search" size={25} color="#3b82f6" />
                </TouchableOpacity>
                </View>
              ),
              headerRight: () => (
                <TouchableOpacity
                onPress={() => {signOut();}}
                style={{marginRight : 10}}>
              <MaterialIcons name="logout" size={25} color="#3b82f6"/>
              </TouchableOpacity>
              ),
              tabBarLabel: 'Profile', 
              headerRightContainerStyle: {
                paddingRight: 15, 
              },
            })} 
          />
        </>
      )}
    </Tab.Navigator>
  );
}

export default MainTabNavigator;

         {/* <Tab.Screen
            name="Meet Me"
            component={MeetMeScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <Button
                  onPress={() => {
                    signOut();
                  }}
                  title="Logout"
                  color="gray"
                />
              ),
              headerRightContainerStyle: {
                paddingRight: 15, 
              },
              tabBarLabel: 'Meet Me', 
            })}
          /> */}

             // <Button
                //   onPress={() => {
                //     signOut();
                //   }}
                //   title="Logout"
                //   color="#3b82f6"
                // />