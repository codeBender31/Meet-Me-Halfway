import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView, Image  } from 'react-native';
import { useTheme } from '../context/ThemeContext';

function HomeScreen({ navigation }) {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkTheme ? '#04080F' : '#A1C6EA'  }]}>
      {/* Theme Switch */}


      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: isDarkTheme ? '#FFF' : '#000' }]}>
        {isDarkTheme ? "Dark Mode" : "Light Mode"}
      </Text>

        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>


      {/* Hero Section */}
        <View style={styles.heroSection}>
        {isDarkTheme ? (
          <Image 
            source={require('../images/DarkMode.png')} 
            style={styles.heroImage} 
          />
        ) : (
          <Image 
            source={require('../images/LoginRegister.png')} 
            style={styles.heroImage} 
          />
        )}
        <Text style={styles.heroSubtitle}>Finding the perfect meeting point has never been easier.</Text>
        {/* <Text style={styles.heroSubtitle}>has never been easier.</Text> */}
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        {/* <Text style={styles.featuresTitle}>Features</Text>
        <Text style={styles.featuresSubtitle}>Everything you need, all in one place</Text> */}
        {/* Feature Items */}
        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>Nearby Amenities</Text>
          <Text style={styles.featureDescription}>Discover close restaurants, cafes, and other amenities.</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>Safety First</Text>
          <Text style={styles.featureDescription}>Choose to meet near police stations or public areas.</Text>
        </View>
      </View>

      <View style={{ flex: 1 }} />

      {/* Registration and Login Buttons */}
      <TouchableOpacity
        onPress={() => navigation.navigate('RegisterModal')}
        style={[styles.button, {


          borderColor: isDarkTheme ? '#166534' : '#34d399',
          backgroundColor: isDarkTheme ? '#047857' : 'white'

        }]}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginModal')}
        style={[styles.button, {
          borderColor: isDarkTheme ? '#155e75' : '#0ea5e9',
          backgroundColor: isDarkTheme ? '#075985' : 'white'
        }]}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Add styles for heroSection, featuresSection, featureItem, etc., here
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  
  switchLabel: {
    fontWeight: '400',
    marginRight: 10, // Add some space between the label and the switch
    fontSize: 16, // Adjust font size as needed
    color: '#000', // Default text color, adjust as needed
  },
  heroImage: {
    width: 500, // Set the width of the image
    height: 250, // Set the height of the image
    resizeMode: 'contain', // Ensure the image is scaled correctly
  },  
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    color: '#0ea5e9',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heroSubtitle: {
    color: 'white',
    fontWeight:'500',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  featuresSection: {
    color: 'white',
    fontWeight:'500',
    width: '100%',
    marginBottom: 20,
  },
  featuresTitle: {
    color: '#0ea5e9',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  featuresSubtitle: {
    color: 'white',
    fontWeight:'500',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  featureItem: {
    marginTop: 10,
  },
  featureTitle: {
    color: '#0ea5e9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featureDescription: {
    color: 'white',
    fontWeight:'500',
    marginTop: 5,
    fontSize: 14,
  },
  button: {
    width: '80%',
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#155e75', // Adjust borderColor based on theme
  },
  registerButtonText: {
    color: '#10b981', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButtonText: {
    color: '#0ea5e9', 
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
