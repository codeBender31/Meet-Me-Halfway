import React, { useLayoutEffect, useCallback } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

function AboutScreen({ navigation }) {

  const { isDarkTheme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const memoizedToggleTheme = useCallback(toggleTheme, []);
  console.log('auth about');
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <Switch value={isDarkTheme} onValueChange={memoizedToggleTheme} style={{ marginLeft: 10 }} />
  //     ),
  //     headerRight: () => (
  //       isAuthenticated ? (
  //         <View style={{ flexDirection: 'row', paddingRight: 10 }}>
  //           <Text>Welcome back!</Text>
  //         </View>
  //       ) : (
  //         <View style={{ flexDirection: 'row', paddingRight: 10 }}>
  //           <TouchableOpacity onPress={() => navigation.navigate('LoginModal')} style={[styles.button, isDarkTheme ? styles.dark : styles.light]}>
  //             <Text style={[styles.buttonText, isDarkTheme ? styles.textDark : styles.textLight]}>Login</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity onPress={() => navigation.navigate('RegisterModal')} style={[styles.button, isDarkTheme ? styles.dark : styles.light, { marginLeft: 8 }]}>
  //             <Text style={[styles.buttonText, isDarkTheme ? styles.textDark : styles.textLight]}>Register</Text>
  //           </TouchableOpacity>
  //         </View>
  //       )
  //     ),
  //   });
  // }, [navigation, isDarkTheme, memoizedToggleTheme, isAuthenticated]); // Ensure isAuthenticated is in the dependency array to re-evaluate when auth state changes.
  

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ?'#04080F' : '#A1C6EA' }]}>
      {/* Position the switch container absolutely within the parent container */}
      <View style={styles.switchContainer}>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
        />
      </View>
    </View>
  <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome to Meet Me Halfway</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Our Mission</Text>
                <Text style={styles.sectionContent}>
                    Our mission is to promote empathy, dialogue, and collaboration across divides.
                    We strive to create spaces where individuals can come together, share their stories, and find common ground.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Inspiration Behind the Project</Text>
                <Text style={styles.sectionContent}>
                    The idea for Meet Me Halfway emerged from our experiences witnessing the transformative impact of genuine conversation.
                    We saw how powerful it can be when people meet each other halfway, with openness and respect.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Our Goals</Text>
                <Text style={styles.sectionContent}>
                    - Encourage empathy and understanding.{'\n'}
                    - Foster dialogue and collaboration.{'\n'}
                    - Break down barriers that divide us.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Meet the Team</Text>
                <View style={styles.teamMembers}>
                    <Text style={styles.teamMember}>Hasti Rathod</Text>
                    <Text style={styles.teamMember}>Sabrina Salazar</Text>
                    <Text style={styles.teamMember}>Abel Hernandez</Text>
                    <Text style={styles.teamMember}>Naomi Unuane</Text>
                    <Text style={styles.teamMember}>Andrew Bradford</Text>
                    <Text style={styles.teamMember}>Daniel Burgess</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Get Involved</Text>
                <Text style={styles.sectionContent}>
                    Join us in our mission to create a more connected world. Whether you want to volunteer your time or support us in other ways, we welcome your participation.
                </Text>
                <Text style={styles.sectionContent}>
                    Contact us at <Text style={styles.link}>contact@meetmehalfway.com</Text> or connect with us on social media.
                </Text>
            </View>

            <View style={styles.footer}>
                <Text>&copy; 2024 Meet Me Halfway</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 16,
        lineHeight: 24,
    },
    teamMembers: {
        marginTop: 10,
    },
    teamMember: {
        fontSize: 16,
        marginBottom: 5,
    },
    link: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
    footer: {
        alignItems: 'center',
        marginTop: 30,
    },
});
export default AboutScreen;
