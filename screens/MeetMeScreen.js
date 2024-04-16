import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import MapView from 'react-native-maps';

const MeetMeScreen = ({ navigation }) => {
  const { isDarkTheme } = useTheme();
  const [userAddress, setUserAddress] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#04080F' : '#A1C6EA' }]}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={MapView.PROVIDER_GOOGLE} // Remove if not using Google Maps
      />
      {/* Floating Input over Map */}
      <View style={styles.floatingView}>
        <TextInput
          style={styles.input}
          onChangeText={setUserAddress}
          value={userAddress}
          placeholder="Enter your address"
          placeholderTextColor="#666"
        />
      </View>
    </View>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Fill the entire screen
  },
  floatingView: {
    position: 'absolute', // This makes the view float over the map
    top: 20, // Distance from the top of the screen
    left: 20, // Distance from the left of the screen
    right: 20, // Distance from the right of the screen
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
    borderRadius: 5,
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc', // Light gray border
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default MeetMeScreen;
