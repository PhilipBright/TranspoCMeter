import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import bulb from '../../assets/bulb.png';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../../firebase/firebaseConfig';
import { increment } from 'firebase/firestore';
import { collection, addDoc, doc, updateDoc, } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import axios from 'axios';






function Result({route}) {

  const GOOGLE_API_KEY = 'AIzaSyBgW215Zkb9oFkJuQa4VVK53O7Jlppq4gc';
  const [totalCarbonEmission, setTotalCarbonEmission] = useState(0);
    const navigation = useNavigation();

   
    const [state, setState] = useState({
        distance: route.params.distance,
        startPlace: route.params.start,
        endPlace: route.params.end
    });
    ;
    
    const type = route.params.type;
    const [carbonEmissions, setCarbonEmissions] = useState(0);
    
    useEffect(() => {
      const calculation = () => {
        let AVERAGE_FUEL_CONSUMPTION, CO2_EMISSION_FACTOR;
    
        if (type === 'car') {
          AVERAGE_FUEL_CONSUMPTION = 7.84;
          CO2_EMISSION_FACTOR = 10.16;
        } else if (type === 'motorcycle') {
          AVERAGE_FUEL_CONSUMPTION = 6.5;
          CO2_EMISSION_FACTOR = 8.89;
        } else if (type === 'train') {
          AVERAGE_FUEL_CONSUMPTION = 3.6;
          
          CO2_EMISSION_FACTOR = 2.93;
        }
    
        const orgDistance = parseFloat(state.distance.replace('mi', ''));

    
        // Convert the fuel consumption to gallons per mile
        const fuelConsumptionInGallons = AVERAGE_FUEL_CONSUMPTION / 2.35214;
    
        // Calculate the total fuel consumption in gallons
        const totalFuelConsumption = orgDistance * fuelConsumptionInGallons;
    
        // Calculate the carbon emissions in kg CO2
        const emissions = totalFuelConsumption * CO2_EMISSION_FACTOR;
    
        setCarbonEmissions(emissions);
        setTotalCarbonEmission(prevTotal => prevTotal + emissions);
      };
    
      calculation();
    }, [type, state.distance]);
    
      const ThanksHandlePress = async () => {
        const firebaseApp = initializeApp(firebaseConfig);
        const auth = getAuth(firebaseApp);
        const db = getFirestore(firebaseApp);
      
        try {
          // Get the currently authenticated user
          const user = auth.currentUser;
      
          if (user) {
            const usersCollectionRef = collection(db, 'users');
            const userDocRef = doc(usersCollectionRef, user.uid);
      
            const calculationData = {};
      
            if (type === 'car') {
              calculationData.car = increment(totalCarbonEmission);
            } else if (type === 'motorcycle') {
              calculationData.motorcycle = increment(totalCarbonEmission);
            } else if (type === 'train') {
              calculationData.train = increment(totalCarbonEmission);
            }
      
            // Update the current user document with the selected data
            await updateDoc(userDocRef, calculationData);
      
            console.log('Data uploaded successfully!');
          } else {
            console.log('No authenticated user found.');
          }
        } catch (error) {
          console.error('Error uploading data:', error);
        }
        try {
          // Get the currently authenticated user
          const user = auth.currentUser;
      
          if (user) {
            const usersCollectionRef = collection(db, 'users');
            const userDocRef = doc(usersCollectionRef, user.uid);
            const currentDate = new Date(); // Create a new Date object with the current date and time

  // Extract the desired information from the Date object
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const day = currentDate.getDate();
  const formattedDate = `${day}-${month}-${year}`;
            const calculationData = {
              Start: state.startPlace,
              End: state.endPlace,
              type,
              carbonEmissions: carbonEmissions,
              distance: state.distance,
              date: formattedDate
            };
      
            // Create a subcollection reference for calculations
            const calculationsCollectionRef = collection(userDocRef, 'calculations');
      
            // Add a new document for the current calculation
            await addDoc(calculationsCollectionRef, calculationData);
      
            console.log('Calculation data stored successfully!');
          } else {
            console.log('No authenticated user found.');
          }
        } catch (error) {
          console.error('Error storing calculation data:', error);
        }
      
        navigation.navigate('Home', {
          carbon: carbonEmissions.toFixed(2),
          type: type,
          hasCalculated: true,
        });
      };
      
      
    
    
    
    
   
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#95D8B9'}}>
        {/* result */}
        <View style={styles.firstContainer}>
            <View style={styles.resultContainer}>
            <View style={{display:'flex', alignItems:'center', width:'55%',height:'100%', padding:10, }}>
                <Text variant='titleLarge' style={{fontWeight:'500', paddingTop:10, color:'#005BA9' }}>Carbon Emission</Text>
                <Text variant='titleLarge' style={{fontWeight:'bold', paddingTop:18 }}> {carbonEmissions.toFixed(2)} kg</Text>
             </View>
             <View style={{display:'flex', alignItems:'center',  width:'45%',height:'100%', padding:10, }}>
                <Text variant='titleLarge' style={{fontWeight:'500', paddingTop:10, color:'#005BA9' }}>Distance</Text>
                <Text variant='titleLarge' style={{fontWeight:'bold', paddingTop:18 }}> {state.distance}les  </Text>
               
             </View>
             </View>
        </View>
        {/* hints */}
        <View style={styles.hintContainer}>
            <View style={styles.hintTextBox}>
                <View style={{width:100, height:30, display:'flex', marginTop:20, flexDirection:'row'}}>
                <Text style={{paddingLeft:20,  fontWeight:'bold'}} variant='titleLarge' >Hints</Text>
               <Image source={bulb} style={{width:25, height:25}}></Image>
               </View>
               <View>
                <Text style={{padding:15,  textAlign:'justify'}} variant='bodyLarge'>
                Hello there, you can reduce carbon emissions in transportation by consolidating trips, offsetting emissions, and promoting eco-driving habits, you can contribute to a greener transportation system. Stay informed about sustainable policies and make conscious choices to minimize your carbon footprint in transportation
                </Text>
            </View>
            </View>
        </View>
        {/* button */}
        <View style={styles.buttonContainer}>
        <View style={styles.buttonBox}>
        <Button style={{ width: 170, height: 45, backgroundColor:'#0B82E9' }} mode="contained" onPress={ThanksHandlePress}>
  <Text style={{textAlign:'center', color:'white',}} variant="titleMedium">I Agree</Text>
</Button>
        </View>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    firstContainer:{
     display:'flex',
     justifyContent:'center',
        alignItems:'center',
     width:'100%',
     height:'40%',
     
    },
    resultContainer:{
        display:'flex',
        flexDirection:'row',
        width:'90%',
        height:'50%',
        backgroundColor:'white',
        borderRadius:10,
    },
    hintContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'40%',
        
        
    },
    hintTextBox:{
        display:'flex',
        width:'90%',
        height:'85%',
        backgroundColor:'white',
        borderRadius:10,
    },
    buttonContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'20%',
       
       }
})
export default Result
