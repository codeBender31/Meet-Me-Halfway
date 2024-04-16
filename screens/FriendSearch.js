import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import{Ionicons} from '@expo/vector-icons'

//Variables
//Dummy function to iterate through all users
const users = Array.from({ length: 10 }, (_, i) => ({
  id: String(i),
  name: `User ${i + 1}`
}));

function FriendSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const sendFriendRequest = (userName) => {
    Alert.alert("Friend Request Sent", `A friend request was sent to ${userName}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for friends"
        placeholderTextColor="#888"
      />
      <FlatList
        data={users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item.name}</Text>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => sendFriendRequest(item.name)}
            >
              <Text style={styles.buttonText}>Send Request</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'dodgerblue',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
  }
});

export default FriendSearch;

    {/* <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        >
        <Ionicons name="arrow-back" size={24} color="#3b82f6" />
        </TouchableOpacity> */}