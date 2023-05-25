// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native';
// import { Button } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import { getAuth, signOut } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';
// import { firebaseConfig } from '../../firebase/firebaseConfig';

// export default function Setting() {
//   const navigation = useNavigation();

//   const handleLogout = async () => {
//     const firebaseApp = initializeApp(firebaseConfig);
//     const auth = getAuth(firebaseApp);

//     try {
//       // Sign out the user
//       await signOut(auth);

//       console.log('User logged out successfully!');
//       navigation.navigate('Login'); // Navigate to the login screen or any other screen after logout
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
    
//     }
//     const test = async () => {
//       const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);

// const usersCollectionRef = collection(db, 'users');
// const querySnapshot = await getDocs(query(usersCollectionRef, where("email", "==", "example@example.com")));

// querySnapshot.forEach((doc) => {
//   console.log('Document ID:', doc.id);
//   console.log('Username:', doc.data().username);
// });

//     }
//       return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#772ea2"
//       barStyle="light-content"/>
//       <Button varient="contained" title="Logout" onPress={handleLogout} />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#8CC6F9',
    
//   },
// });

import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import firestore from 'firebase/firestore'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
const Setting = () => {
  const [email, setEmail] = useState('');
  const [documents, setDocuments] = useState([]);

  const handleSearch = async () => {
    const usersCollectionRef = firestore().collection('users');
    const querySnapshot = await usersCollectionRef.where('email', '==', email).get();

    if (querySnapshot.empty) {
      setDocuments([]);
    } else {
      const foundDocuments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(foundDocuments);
    }
  };

  return (
    <View style={{paddingTop:300}}>
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Search" onPress={handleSearch} />
      {documents.length === 0 ? (
        <Text>No document found with the provided email.</Text>
      ) : (
        documents.map((doc) => (
          <View key={doc.id}>
            <Text>Document ID: {doc.id}</Text>
            <Text>Username: {doc.username}</Text>
          </View>
        ))
      )}
    </View>
  );
};

export default Setting;
