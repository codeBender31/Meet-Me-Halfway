// DashboardScreen.js
import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, Switch, Image, TouchableOpacity, AppState, Modal} from 'react-native';
// import { PushNotification } from 'react-native-push-notification';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import { useTheme } from '../context/ThemeContext'; // Import useTheme


const DashboardScreen = ({ navigation }) => {
  const {isDarkTheme, toggleTheme} = useTheme();
  //Notifications State
  const[notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [modalVisible, setIsModalVisible] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const[locationPermission, setLocationPermission] = useState(false);
  const[locationModalVisible, setLocationModalVisible] = useState(false);
  const[userBio, setUserBio] = useState("Tap to edit your bio");

useEffect(() =>{
  const subscription = AppState.addEventListener("change", nextAppState =>{
    if(appState.match(/inactive|background/) && nextAppState === "active"){
      console.log("App has been put in the background");

    }else if(nextAppState === "background"){
      if(notificationsEnabled)
      {
        // PushNotification.localNotification({
        //   title:"Reminder",
        //   message:"Please do not forget to log off.",
        // });
      }
    }
    setAppState(nextAppState);
  });

  return () => {
    subscription.remove();
  };

},[appState, notificationsEnabled]);

  //Notifications Toggle
  const handleNotificationsToggle = () =>{
    setNotificationsEnabled(!notificationsEnabled);
    setIsModalVisible(true);
}

  //New Toggle to handle Location Permission from users
  const handleLocationToggle = () => {
   setLocationPermission(!locationPermission)
    setLocationModalVisible(true);
  }
  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor: isDarkTheme ? '#04080F' : '#A1C6EA'}]}>
      <View style={styles.profileImageContainer}>
      <Image
      source={require('../images/ProfilePic.png')}
      style={styles.profileImage}
      />
      <Text style={[styles.profileName,{color: isDarkTheme ? '#FFFFFF' : '#000000'}]}>John Doe</Text>
      </View>

      <View style={styles.bioContainer}>
        <TextInput
        style={[styles.bioInput, {color: isDarkTheme ? '#FFFFFF' : '#000000', backgroundColor: isDarkTheme ? '#04080F' : '#A1C6EA'}]}
        onChangeText={setUserBio}
        value={userBio}
        multiline={true}
        />
        <Button title="Update Bio" onPress={() => console.log("Bio has been saved")}/> 
        {/* Place holder for save function for backend */}
      </View>

      <Text style={[styles.text, {color: isDarkTheme ? '#FFFFFF' : '#000000'}]}>Settings </Text>

      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, {color: isDarkTheme ? '#FFFFFF' : '#000000'}]}>Dark Mode Control</Text>
      <Switch
       trackColor = {{false: "#767577", true: "#81b0ff"}}
      //  thumbColor = {isDarkTheme ? "#f5dd4b" : "f4f3f4"}
       onValueChange = {toggleTheme}
       value= {isDarkTheme}
       />
      </View>

      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, {color: isDarkTheme ? '#FFFFFF' : '#000000'}]}>Notifications</Text>
      <Switch
       trackColor = {{false: "#767577", true: "#81b0ff"}}
      //  thumbColor = {isDarkTheme ? "#f5dd4b" : "f4f3f4"}
       onValueChange ={handleNotificationsToggle}
       value= {notificationsEnabled}
       />
      </View>

      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, {color: isDarkTheme ? '#FFFFFF' : '#000000'}]}>Location Permissions</Text>
      <Switch
      trackColor={{false: "#767577", true: "#81b0ff"}}
      onValueChange={handleLocationToggle}
      value={locationPermission}
      />
      </View>
      {/* Notifications are disabled modal */}
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
      setIsModalVisible(!modalVisible);
      }}
      >

      <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <Text style={styles.modalText}>
        {notificationsEnabled ? "Notifications are ON." : "Notifications are OFF."}
      </Text>
      <Button
      title="Close"
      onPress={() => setIsModalVisible(!modalVisible)}
      />

      </View>
      </View>
      </Modal>

    <Modal
    animationType="slide"
    transparent={true}
    visible={locationModalVisible}
    onRequestClose={() => setLocationModalVisible(!locationModalVisible)}
    >
    <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={styles.modalText}>
        {locationPermission ? "Location is ON" : "Location is OFF"}
      </Text>
      <Button
      title="Close"
      onPress={() => setLocationModalVisible(!locationModalVisible)}
      />
    </View>
    </View>
    </Modal>
    
   </ScrollView> //Close off ScrollView
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageContainer:{
    marginTop: 5,
    // alignItems: 'center',
    marginVertical: 20,
  },
  profileImage:{
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName:{
    fontSize: 24,
    fontWeight: 'bold'
  },
  switchLabel:{
    marginRight: 10,
    fontWeight: 'bold'
  },
  switchContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  centeredView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 22,
  },
  modalView:{
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset:{
      width: 0,
      height: 2,

    },
    shadowOpacity: .25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText:{
    marginBottom: 15,
    textAlign: 'center',
  },
  bioContainer:{
    // backgroundColor: 'white',
    marginVertical: 20,
    width:'80%',
    alignSelf: 'center',
  },
  bioInput:{
    borderWidth: 1,
    borderColor: '#767577',
    borderRadius: 5,
    padding: 10,
    minHeight: 60,
    textAlignVertical: 'top',
  },


});

export default DashboardScreen;
