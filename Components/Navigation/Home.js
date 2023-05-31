import React from 'react';
import { SafeAreaView, StatusBar, Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../../firebase/firebaseConfig';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { useState } from 'react';
import { getFirestore, doc, getDoc, collection, query, where } from 'firebase/firestore';


const CarbonSource = ({ source, value }) => {
  return (
    <View style={styles.carbonSourceContainer}>
      <Text style={styles.carbonSourceText}>{source}</Text>
      <Text style={styles.carbonSourceValue}>{value} kg</Text>
    </View>
  );
};



 

const Profile = ({username, userID}) => {
  return(
    <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{username}</Text>
      </View>
  );
}



const Home = ({route}) => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [totalCarbonEmission, setTotalCarbonEmission] = useState(0);
  const [carCarbon, setCarCarbon] = useState(0);
  const [motorcycleCarbon, setMotorcycleCarbon] = useState(0);
  const [trainCarbon, setTrainCarbon] = useState(0);
  const { carbon, type, hasCalculated } = route.params ?? {};
  const [username, setUsername] = useState('');

  useEffect( () => {
    const fetchUsername = async () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    const currentUser = auth.currentUser;
  
    if (currentUser) {
      const userId = currentUser.uid;
      const db = getFirestore(firebaseApp);
  const usersCollectionRef = collection(db, 'users');
      const userDocRef = doc(usersCollectionRef, userId);
  
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const currentUsername = userData.username;
        setUsername(currentUsername);
      }
     

    }}
  // const fetchUsername = async () => {
  //   const firebaseApp = initializeApp(firebaseConfig);
  //   const auth = getAuth(firebaseApp);
  //   const currentUser = auth.currentUser;
    
  //   if (currentUser) {
  //     const username = currentUser.uid; // Get the username from the current user's display name
  //     setUsername(username);
  //     setUserID(currentUser.uid); // Update the state variable with the user ID
  //   }
  // };
  const fetchUserCalculation = async () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    const currentUser = auth.currentUser;
  
    if (currentUser) {
      const userId = currentUser.uid;
      const db = getFirestore(firebaseApp);
      const userDocRef = doc(db, 'users', userId);
  
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
  
        // Sum the existing data in Firestore
        let totalCarbonEmission = 0;
        if (userData.car) {
          totalCarbonEmission += parseFloat(userData.car);
          setCarCarbon(parseFloat(userData.car));
        }
        if (userData.motorcycle) {
          totalCarbonEmission += parseFloat(userData.motorcycle);
          setMotorcycleCarbon(parseFloat(userData.motorcycle));
        }
        if (userData.train) {
          totalCarbonEmission += parseFloat(userData.train);
          setTrainCarbon(parseFloat(userData.train));
        }
  
        setTotalCarbonEmission(totalCarbonEmission);
      }
    }
  };
  

  fetchUsername();
  fetchUserCalculation();

 
  
  
  if (hasCalculated===true) {
    // Update the total carbon emission if the user has calculated
    setTotalCarbonEmission(prevCarbon => prevCarbon + parseFloat(carbon));
  } else {
    // Set all data to 0 if the user hasn't calculated
    setTotalCarbonEmission(0);
  }
  if(type === 'car') {
    setCarCarbon(prevCarbon => prevCarbon + parseFloat(carbon));
  }
  else if (type === 'motorcycle') {
    setMotorcycleCarbon(prevCarbon => prevCarbon + parseFloat(carbon));
  }
  else if (type === 'train') {
    setTrainCarbon(prevCarbon => prevCarbon + parseFloat(carbon));
  }
  }, [hasCalculated, carbon]);
  
  // const type = route.params.carbon;
  
  return (
    <SafeAreaView style={styles.container}>
     <ScrollView>

    {/* Top Welcome Text */}
    
    <View style={{paddingTop: 10, paddingLeft: 18}}>
      <Text style={{fontSize: 20, fontWeight: 'bold',}}>Welcome to</Text>
      <View style={{display: 'flex', flexDirection: 'row',}}>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: '#2AA7A2'}}>TranspoCMeter!  </Text>
      <Image source={require('../../assets/positive.png')} style={{width: 33, height:33}} />
      </View>
    </View>

    {/* profile dashboard container */}

    <View style={styles.contentContainer}>
     {/* <Profile username={currentEmail}/> */}
     <Profile username={username}  />


    {/* Tips */}
    <View style={styles.tipContainer}>
      <View style={styles.tipTextBox}>
        <View style={styles.tipAd}>
        <Text style={styles.tipText}>Make the Earth happy and Track the Carbon Emissions </Text>
        </View>
        <View style={{width: 90,height:90,  marginLeft:40, justifyContent:'center',alignItems:'center', borderColor: '#8CC6F9'}}>
        <Image source={require('../../assets/plant.png')} style={{width:71, height: 71,}} />
        </View>
      </View>
    </View>
   
      <View style={styles.carbonSpendingContainerMain}>
      <View style={styles.carbonSpendingContainer}>

        <View style={styles.carbonSpendingTextContainer}>
        <Text style={styles.carbonSpendingText}>
          Total Carbon Spending
        </Text>
        
        <Text style={styles.carbonSpendingValue}>{totalCarbonEmission.toFixed(0)} kg</Text>
        </View>

        <CarbonSource source="Car" value={carCarbon.toFixed(0)} />
        <CarbonSource source="Motorcycle" value={motorcycleCarbon.toFixed(0)}  />
        <CarbonSource source="Train" value={trainCarbon.toFixed(0)}  />
      </View>
      </View>

    </View>
    </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  carbonSourceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 50,
    marginRight:50,
  },
  carbonSourceText: {
    fontSize:15,
    fontWeight: 'bold'
  },
  carbonSourceValue: {
    fontSize:15,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  contentContainer: {
  
    flex:1,
    width: '100%',
    height: 600,
    marginTop: 125,
    backgroundColor: '#95D8B9',
    borderRadius: 50,
    marginBottom: -100,
   
  },


  profileContainer: {
    alignItems: 'center'
  },
  profileImage: {
    width: 198,
    height: 198,
    marginTop: -100,
    marginBottom: 15
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0b192f',
    marginBottom: 20
  },

  tipContainer:{
    
    width:160,
    height:70,
    borderRadius:30,
    marginBottom:35,
    
    
  },
  tipAd:{
    width:185,
    height:90,
    backgroundColor: '#ffffff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
  },
  tipTextBox:{
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    marginLeft: 40,
  },
  tipText:{
    padding:10,
    fontSize: 15,
    fontWeight: 'bold'
  },

  carbonSpendingContainerMain:{
    justifyContent:'center',
    alignItems:'center'
  },
  carbonSpendingContainer: {
    display:'flex',
    backgroundColor: 'white',
    width: '70%',
    height: 180,
    justifyContent:'center',
    borderRadius:20
    
  },
  carbonSpendingText:{
   fontSize: 20,
   fontWeight: 'bold',
  
  },
  carbonSpendingValue:{
    paddingTop:10,
    fontSize:20,
    fontWeight:'bold',
    color: '#FF6C6C'
  },
  carbonSpendingTextContainer:{
    justifyContent:'center',
    alignItems:'center',
  }
  });

    export default Home;