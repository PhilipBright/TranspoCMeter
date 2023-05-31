import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase/firebaseConfig';
import { TouchableOpacity } from 'react-native';

export default function Setting() {
  
  const navigation = useNavigation();
  const handleHistory = () => {
    
    navigation.navigate('History')
  }
  const handleLogout = async () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);

    try {
      // Sign out the user
      await signOut(auth);

      console.log('User logged out successfully!');
      navigation.navigate('Login'); // Navigate to the login screen or any other screen after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
    
    }
//     const test = async () => {
//       const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);

// const usersCollectionRef = collection(db, 'users');
// const querySnapshot = await getDocs(query(usersCollectionRef, where("email", "==", "example@example.com")));

// querySnapshot.forEach((doc) => {
//   console.log('Document ID:', doc.id);
//   console.log('Username:', doc.data().username);
// });

    // }
      return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#772ea2"
      barStyle="light-content"/>
    <TouchableOpacity style={{padding:10,  backgroundColor: '#DDDDDD',}} onPress={handleLogout}>
        <Text style={{fontSize:17}}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{padding:10,  backgroundColor: '#DDDDDD',}} onPress={handleHistory}>
        <Text style={{fontSize:17}}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{padding:10,  backgroundColor: '#DDDDDD',}} onPress={handleLogout}>
        <Text style={{fontSize:17}}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#95D8B9',
    backgroundColor:'white'
   
    
  },
});
