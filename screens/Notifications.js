import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import{Ionicons} from '@expo/vector-icons'

//Dummy Data
const initialNotifications = [
    {id: '1', type: 'friendRequest', from: 'User 1', status: 'pending'},
    {id: '2', type: 'meetRequest', from: 'User 2', details: 'PS5 Purchase', status: 'pending'},
    {id: '3', type: 'friendRequest', from: 'User 3', status: 'pending'},
    {id: '4', type: 'meetRequest', from: 'User 4', details: 'Matco Tools Sale', status: 'pending'},
    {id: '5', type: 'friendRequest', from: 'User 5', status: 'pending'},
    {id: '6', type: 'meetRequest', from: 'User 6', details: 'Macbook Purchase', status: 'pending'},
    {id: '7', type: 'meetRequest', from: 'User 7', details: 'iPod Sale', status: 'pending'},
];

function Notifications(){
const [notifications, setNotifications] = useState(initialNotifications);

const handleFriendRequest = (id, action) =>{
    Alert.alert(`Friend request ${action}`, `You have ${action} the friend request.`);
};

const handleMeetingRequest = (id, action) => {
    Alert.alert(`Meet request ${action}`, `You have ${action} the meet request.`);
}

const renderAllNotifications = ({item}) => (
    <View style={styles.notificationElement}>
    <Text style={styles.notificationText}>{item.type === 'friendRequest' ? `${item.from} sent you a friend request.` : `${item.from} sent you a meet request : ${item.details}` }</Text>
    <View style={styles.actions}>
    <TouchableOpacity style={styles.actionButton} onPress={() => handleFriendRequest(item.id, 'accepted')}>
    <Text style={styles.actionButtonText}>Accept</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.actionButton} onPress={() => handleFriendRequest(item.id, 'ignored')}>
                <Text style={styles.actionButtonText}> Ignore</Text>  
            </TouchableOpacity>
        </View>
    </View>
);
const navigation = useNavigation();

    return(    
    <View style={styles.container}>
    <FlatList
    data={initialNotifications}
    keyExtract={item => item.id}
    renderItem={renderAllNotifications}
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
    notificationElement:{
        //Background color
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    notifcationText:{
        marginBottom: 10,
    },
    actions: {
        flexDirection: 'row',
        justifyContent:'flex-end',
    },
    actionButton:{
        marginLeft: 10,
        backgroundColor: 'dodgerblue',
        borderRadius: 5,
        padding: 10,
    },
    actionButtonText:{
        color:'#fff'
    }
});

export default Notifications;

 {/* <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            >
            <Ionicons name="arrow-back" size={24} color="#3b82f6" />
            </TouchableOpacity> */}