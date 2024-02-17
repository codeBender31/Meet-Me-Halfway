import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, StyleSheet, Text, Switch } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useTheme } from '../context/ThemeContext'; 
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'light'; 

  const iconColor = isDarkMode ?  '#000':'#FFF' ;
  const textColor = isDarkMode ? '#000' :'#FFF' ; 



  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: { backgroundColor: isDarkMode ? '#FFF' : '#000' },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'How to use',
          tabBarIcon: ({ color }) => <TabBarIcon name="question" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
                {({ pressed }) => (
                  <View style={styles.loginContainer}>
                    <FontAwesome
                      name="sign-in"
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={styles.icon}
                    />
                    <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>Register</Text>
                  </View>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerStyle: {
            backgroundColor: isDarkMode ? '#FFF' : '#000' , 
          },
          headerTintColor: isDarkMode ? '#000' : '#FFF' ,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
                {({ pressed }) => (
                  <View style={styles.loginContainer}>
                    <FontAwesome
                      name="sign-in"
                      size={25}
                      color={iconColor}
                      style={styles.icon}
                    />
                    <Text style={{ color: textColor }}>Register</Text>
                  </View>
                )}
              </Pressable>
            </Link>
          ),
          headerLeft: () => (
            <View style={styles.themeToggleContainer}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme}
                value={isDarkMode}
                style={styles.themeToggleSwitch}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => <TabBarIcon name="info-circle" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
                {({ pressed }) => (
                  <View style={styles.loginContainer}>
                    <FontAwesome
                      name="sign-in"
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={styles.icon}
                    />
                    <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>Register</Text>
                  </View>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

    </Tabs>
    
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center items vertically in the container
    marginRight: 15, // Space on the right
  },
  icon: {
    marginRight: 5, // Space between icon and text
  },
  themeToggleContainer: {
    marginLeft: 15,
  },
  themeToggleSwitch: {
    // Additional styling for the switch if needed
  },

});