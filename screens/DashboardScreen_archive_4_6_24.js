import React, { useState, useEffect  } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard   } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import MapView, { Marker } from 'react-native-maps';
import Checkbox from 'expo-checkbox';
import Modal from 'react-native-modal';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';




const DashboardScreen = ({ navigation }) => {
  const { isDarkTheme } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(true);


  // Data for backend
  const [userAddress, setUserAddress] = useState('');
  const [friendsAddress, setFriendsAddress] = useState('350 E Vista Ridge Mall Dr, Lewisville, TX 75067, USA');
  const [radius, setRadius] = useState('');
  const [midpoint, setMidpoint] = useState({lat: 0, lng: 0}); // Default to 0,0 or a sensible default
  const [places, setPlaces] = useState([]); // Correctly initialized as an empty array

  



  useEffect(() => {
    console.log(userAddress);
    console.log(friendsAddress);
  }, [userAddress]);


  const [checkboxes, setCheckboxes] = useState([
    { label: 'Cafe', checked: false },
    { label: 'Bar', checked: false },
    { label: 'Restaurant', checked: false },
    { label: 'Museum', checked: false },
    { label: 'Park', checked: false },
    { label: 'Theater', checked: false },
    { label: 'Police Station', checked: false },
    { label: 'Hospital', checked: false },
  ]);




  const toggleCheckbox = (index) => {
    const newCheckboxes = [...checkboxes];
    // Toggle the checked state
    newCheckboxes[index].checked = !newCheckboxes[index].checked;

    // Log the label and the new checked state
    console.log(`${newCheckboxes[index].label}: ${newCheckboxes[index].checked}`);

    // Update the state
    setCheckboxes(newCheckboxes);
};


  // Define how many checkboxes per row
  const checkboxesPerRow = 4;
  // Group checkboxes into rows
  const checkboxRows = [];
  for (let i = 0; i < checkboxes.length; i += checkboxesPerRow) {
    checkboxRows.push(checkboxes.slice(i, i + checkboxesPerRow));
  }


  // GOOGLE API METHODS FOR MIDPOINT AND PLACES
  const geocodeAddress = async (address) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyDASA8fmLTGHD2P2wTN5Bh9S5NKOET-Gtc`);
    const data = await response.json();
    return data.results[0].geometry.location; // { lat, lng }
  };
  
  const calculateMidpoint = (location1, location2) => {
    const lat = (location1.lat + location2.lat) / 2;
    const lng = (location1.lng + location2.lng) / 2;
    return { lat, lng };
  };
  
  const findPlaces = async (midpoint, types, radius) => {
    let places = [];
    for (const type of types) {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${midpoint.lat},${midpoint.lng}&radius=${radius}&type=${type}&key=AIzaSyDASA8fmLTGHD2P2wTN5Bh9S5NKOET-Gtc`);
      const data = await response.json();
      places = places.concat(data.results);
    }
    return places;
  };
  
  const handleFindHalfway = async () => {
    try {
        const location1 = await geocodeAddress(userAddress);
        const location2 = await geocodeAddress(friendsAddress);
        const midpointCalculated = calculateMidpoint(location1, location2);

        // Set the midpoint in state
        setMidpoint(midpointCalculated);

        // Filter for checked checkboxes and map to their labels
        const checkedTypes = checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.label.toLowerCase());

        const placesFound = await findPlaces(midpointCalculated, checkedTypes, radius * 1000);
        console.log("Places found: ", placesFound);
        setPlaces(placesFound); // Update state with the found places
    } catch (error) {
        console.error("Failed to find places: ", error);
    }
};

  
  



  return (

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >

    <ScrollView keyboardShouldPersistTaps='always' style={[styles.scrollView, { backgroundColor: isDarkTheme ? '#04080F' : '#A1C6EA' }]}>

      {/* Button to Open Modal */}
      <TouchableOpacity
        style={[styles.openModalButton , {backgroundColor: isDarkTheme ? '#222' : '#0d9488'}]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={[styles.openModalButtonText, {color: isDarkTheme ? '#fff' : '#fff'}]}>Change Address</Text>
      </TouchableOpacity>





      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)} // Dismiss modal on clicking outside
        onSwipeComplete={() => setIsModalVisible(false)} // Dismiss modal on swipe down
        swipeDirection="down" // Enable swiping down to dismiss
        style={styles.modal}
        animationIn="slideInUp" // Slide in from the bottom
        animationOut="slideOutDown" // Slide out to the bottom
        backdropTransitionOutTiming={0} // Remove backdrop fade delay on close
      >
        <View style={[styles.modalView, {backgroundColor: isDarkTheme ? '#333' : '#dbeafe'}]}>
          <Text style={[styles.modalText, {color: isDarkTheme ? '#FFF' : '#2563eb'}]}>
            Enter an address or use your current location
          </Text>
          {/* <TextInput
            style={[styles.input, {color: isDarkTheme ? '#FFF' : '#000', backgroundColor: isDarkTheme ? '#555' : '#EEE'}]}
            onChangeText={setUserAddress}
            value={userAddress}
            placeholder="Enter Your address"
            placeholderTextColor={isDarkTheme ? '#DDD' : '#94a3b8'}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          /> */}
          <GooglePlacesAutocomplete
            // listViewDisplayed={false}
            placeholder="Enter your address"
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: "distance"
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              // console.log(data, details);
              setUserAddress(details.formatted_address);
            }}
            query={{
              key: 'AIzaSyDASA8fmLTGHD2P2wTN5Bh9S5NKOET-Gtc',
              language: 'en',
              components: 'country:us', // Restrict results to a specific country (optional)
              types: 'address', // Return only address results
            }}
            styles={{
              textInput: styles.input, // Reuse your existing style
              listView: {
                flex: 1,
                marginTop: -20,
              },

            }}
            textInputProps={{
              placeholderTextColor: isDarkTheme ? '#DDD' : '#94a3b8',
              returnKeyType: 'done',
              onSubmitEditing: () => Keyboard.dismiss(),
              onChangeText: (text) => setUserAddress(text), // Update address state with every change
            }}
            
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.addButtonStyle, { backgroundColor: isDarkTheme ? '#222' : '#3b82f6' }]}
              onPress={() => {
                // Implement functionality to add address
                setIsModalVisible(!isModalVisible);
              }}>
              <Text style={styles.buttonText}>Add Address</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.useLocationButtonStyle, { backgroundColor: isDarkTheme ? '#696969' : '#0d9488' }]}
              onPress={() => {
                // Implement functionality to use current location
              }}>
              <Text style={styles.buttonText}>Use current location</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelButtonStyle, { backgroundColor: isDarkTheme ? '#444' : '#dbdbdb', borderColor: isDarkTheme ? '#666' : '#aaa' }]}
              onPress={() => setIsModalVisible(!isModalVisible)}>
              <Text style={[styles.buttonText, {color: isDarkTheme ? '#FFF' : '#333'}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>





      <View style={styles.container}>
        <View style={styles.profileSection}>
          <Image
            source={require('../images/ProfilePic.png')}
            style={styles.profilePic}
          />
          <Text style={[styles.userName, { color: isDarkTheme ? '#ffffff' : '#000000' }]}>John Doe</Text>
        </View>

        <MapView
          style={styles.map}
          initialRegion={{
              latitude: midpoint.lat || 0, // Fallback to 0 if undefined
              longitude: midpoint.lng || 0, // Fallback to 0 if undefined
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
          }}
        >
          {places && places.map((place, index) => (
            <Marker // Corrected from MapView.Marker to Marker
                key={index}
                coordinate={{
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                }}
                title={place.name}
            />
          ))}
        </MapView>






        <Text style={styles.smallText}>
          Choose points of interest near the midpoint.
        </Text>


        {checkboxRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.checkboxRow}>
            {row.map((checkbox, checkboxIndex) => (
              <View key={checkboxIndex} style={styles.checkboxContainer}>
                {/* Wrapping TouchableOpacity in a View */}
                <View style={styles.checkboxTouchableArea}>
                <TouchableOpacity
                  onPress={() => toggleCheckbox(rowIndex * checkboxesPerRow + checkboxIndex)}
                  style={[styles.customCheckbox, checkbox.checked ? styles.checkboxChecked : styles.checkboxUnchecked]}>
                  {/* You can add a checkmark icon or similar here if checkbox.checked is true */}
                </TouchableOpacity> 
                </View>
                <Text style={styles.checkboxLabel}>{checkbox.label}</Text>
              </View>
            ))}
          </View>
        ))}


      <View style={styles.buttonGroup}>
        {/* First Row with Two Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.halfWidthButton, { backgroundColor: isDarkTheme ? '#000000' : '#f1f5f9' }]}>
            <Text style={styles.findFriendButtonText}>Choose A Friend</Text>
          </TouchableOpacity>
          <TextInput 
            style={[styles.radiusInput, { backgroundColor: isDarkTheme ? '#000000' : '#f1f5f9' }]} 
            placeholder=" Enter Radius" 
            keyboardType="numeric" // Assuming the radius is a number
            placeholderTextColor="#3b82f6" // Adjust as needed
            returnKeyType="done"
            value={radius} // Bind radius state to the TextInput
            onChangeText={text => setRadius(text)} 
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>
        
        {/* Second Row with One Full Width Button */}
        <View style={styles.fullWidthButtonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.fullWidthButton]}
            onPress={handleFindHalfway}
          >
            <Text style={styles.buttonText}>Find Halfway Meet Spots</Text>
          </TouchableOpacity>
        </View>


      </View>


      <Text style={[styles.tableLabel, { color: isDarkTheme ? '#f1f5f9' : '#000000' }]}>Results</Text>
      <View style={styles.tableContainer}>
        <View style={[styles.tableHeaderRow, { backgroundColor: isDarkTheme ? '#475569' : '#ffffff' }]}>
          <Text style={[styles.tableHeader, { color: isDarkTheme ? '#f1f5f9' : '#000000' }]}>Column 1</Text>
          <Text style={[styles.tableHeader, { color: isDarkTheme ? '#f1f5f9' : '#000000' }]}>Column 2</Text>
          <Text style={[styles.tableHeader, { color: isDarkTheme ? '#f1f5f9' : '#000000' }]}>Column 3</Text>
          <Text style={[styles.tableHeader, { color: isDarkTheme ? '#f1f5f9' : '#000000' }]}>Column 4</Text>
        </View>
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>Data {index + 1}, 1</Text>
            <Text style={styles.tableCell}>Data {index + 1}, 2</Text>
            <Text style={styles.tableCell}>Data {index + 1}, 3</Text>
            <Text style={styles.tableCell}>Data {index + 1}, 4</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.tableLabel, { color: isDarkTheme ? '#f1f5f9' : '#000000' }]}>Favorites</Text>
      <View style={styles.tableContainer}>
        <View style={[styles.tableHeaderRow, { backgroundColor: isDarkTheme ? '#475569' : '#ffffff' }]}>
          <Text style={[styles.tableHeader, { color: isDarkTheme ? '#f1f5f9' : '#000000' }]}>Column 1</Text>
          <Text style={[styles.tableHeader, { color: isDarkTheme ? '#f1f5f9' : '#000000' }]}>Column 2</Text>
          <Text style={[styles.tableHeader, { color: isDarkTheme ? '#f1f5f9' : '#000000' }]}>Column 3</Text>
          <Text style={[styles.tableHeader, { color: isDarkTheme ? '#f1f5f9' : '#000000' }]}>Column 4</Text>
        </View>
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>Data {index + 1}, 1</Text>
            <Text style={styles.tableCell}>Data {index + 1}, 2</Text>
            <Text style={styles.tableCell}>Data {index + 1}, 3</Text>
            <Text style={styles.tableCell}>Data {index + 1}, 4</Text>
          </View>
        ))}
      </View>





      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    paddingTop: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 12,
    marginBottom: -4,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginBottom: -4,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  map: {
    width: '93%',
    height: 300,
    marginTop: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 0,
    marginTop: 4,
  },
  checkboxContainer: {
    alignItems: 'center',
    width: '23%', // Adjust based on your layout
  },
  customCheckbox: {
    height: 24,
    width: 24,
    borderRadius: 12, // Half of height or width to make it circle
    borderWidth: 2,
    borderColor: '#60a5fa', // Dark blue border
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007bff', // Fill color when checked
    borderColor: '#e2e8f0',
  },
  checkboxUnchecked: {
    backgroundColor: '#e2e8f0', // No fill color when unchecked
  },
  checkboxLabel: {
    marginTop: 4,
    color: '#2563eb',
    // Add other styling as needed
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    width: '100%',
    height: '60%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 2,
    borderColor: '#60a5fa',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: '100%', // Full width of the modal
    height: 50, // Comfortable height for touch
    marginTop: 20, // Space from the previous element
    marginBottom: 20, // Space for the next element
    borderWidth: 2,
    borderColor: '#60a5fa',
    padding: 10, // Inner text padding
    borderRadius: 10, // Rounded corners
    fontSize: 16, // Readable text size


    shadowColor: '#000', // Shadow for depth (optional)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  radiusInput: {
    // backgroundColor: '#f1f5f9', // Match the button background color
    padding: 15, // Match the button padding for similar dimensions
    borderWidth: 2, // Set the border width
    borderColor: '#3b82f6', // Dark blue color for the border
    borderRadius: 5, // Rounded corners to match the button
    color: '#3b82f6', // Text color inside the input
    textAlign: 'center', // Center the text inside the input
    width: '48%', // Slightly less than half to accommodate margin/padding
    marginHorizontal: '1%', // Optional, for spacing between buttons
    fontWeight: '500',
  },
  findFriendButtonText: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  addAddressbuttonStyle: {
    padding: 10, // Comfortable touch area
    borderRadius: 5, // Rounded corners for the buttons
    marginTop: 10, // Space between the buttons
    alignItems: 'center', // Center text horizontally
    borderWidth: 1,
    borderColor: '#1d4ed8',
  },
  useLocationButtonStyle: {
    padding: 10, // Comfortable touch area
    borderRadius: 5, // Rounded corners for the buttons
    marginTop: 10, // Space between the buttons
    alignItems: 'center', // Center text horizontally
    borderWidth: 1,
    borderColor: '#166534',
  },
  cancelButtonStyle: {
    padding: 10, // Comfortable touch area
    borderRadius: 5, // Rounded corners for the buttons
    marginTop: 10, // Space between the buttons
    alignItems: 'center', // Center text horizontally
    borderWidth: 1,
    borderColor: '#166534',
  },
  addButtonStyle: {
    padding: 10, // Comfortable touch area
    borderRadius: 5, // Rounded corners for the buttons
    marginTop: 10, // Space between the buttons
    alignItems: 'center', // Center text horizontally
    borderWidth: 1,
    borderColor: '#1d4ed8',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalButtons: {
    width: '100%', // Take the full width to accommodate buttons
    marginBottom: 150, // Space above the button group
  },
  openModalButton: {
    // backgroundColor: '#007bff', // Button color
    width: '98%',
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 5,
    marginTop: 4, // Adjust based on your layout
  },
  openModalButtonText: {
    color: '#ffffff', // Button text color
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonGroup: {
    width: '100%', // Take up all available width
    alignItems: 'center',
    marginTop: 20, // Adjust as necessary
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Use the entire width for the row
  },
  halfWidthButton: {
    // backgroundColor: '#bfdbfe', 
    backgroundColor: '#f1f5f9', 
    padding: 15, // Match the button padding for similar dimensions
    borderWidth: 2, // Set the border width
    borderColor: '#3b82f6', // Dark blue color for the border
    borderRadius: 5, // Rounded corners to match the button
    color: '#3b82f6', // Text color inside the input
    textAlign: 'center', // Center the text inside the input
    width: '48%', // Slightly less than half to accommodate margin/padding
    marginHorizontal: '1%', // Optional, for spacing between buttons
  },
  fullWidthButtonContainer: {
    width: '98%', // Full width container for the single button
    marginTop: 10, // Space between the rows
  },
  fullWidthButton: {
    width: '100%', // Button takes the full width of its container
  },
  button: {
    backgroundColor: '#007bff', // Example background color
    padding: 15, // Padding inside the button
    borderRadius: 5, // Rounded corners
    alignItems: 'center', // Center text horizontally
  },
  buttonText: {
    color: '#ffffff', // Text color
    fontSize: 16, // Text size
  },
  cancelButton: {
    backgroundColor: '#94a3b8', // Red color for cancel, adjust as needed
    borderWidth: 1,
    borderColor: '#64748b',
    marginTop: 10, // Separate it a bit from the other buttons
  },
  cancelButtonText: {
    color: '#FFF', // White text for visibility
  },
  smallText: {
    width: '100%', // Makes the text full width
    textAlign: 'center', // Center the text if you want
    fontSize: 12, // Smaller font size for subscript-like text
    color: '#1d4ed8', // Dimmed text color for less emphasis
    marginTop: 10, // Space it out from other elements if necessary
    marginBottom: 10, // Space it out from other elements if necessary
    textDecorationLine: 'underline', // Adds underlining
},
tableContainer: {
  width: '98%',
  borderWidth: 1,
  borderColor: '#ddd',
  marginVertical: 20,
},
tableHeaderRow: {
  flexDirection: 'row',
  // backgroundColor: '#f0f0f0',
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
},
tableHeader: {
  flex: 1,
  padding: 10,
  fontWeight: 'bold',
  textAlign: 'center',
},
tableRow: {
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
},
tableCell: {
  flex: 1,
  padding: 10,
  textAlign: 'center',
},
tableLabel: {
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 30,
  textAlign: 'center',
},
});

export default DashboardScreen;
