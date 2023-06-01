import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { collection, getFirestore, doc, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../../firebase/firebaseConfig';
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth'; // Assuming you have a custom hook for accessing the authenticated user
import { Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';


function History() {
  const [calculations, setCalculations] = useState([]);
  // Access the authenticated user
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchCalculations = async () => {
      const firebaseApp = initializeApp(firebaseConfig);
      const db = getFirestore(firebaseApp);

      try {
        if (user) {
          const userId = user.uid;
          const calculationsCollectionRef = collection(
            db,
            'users',
            userId,
            'calculations'
          );
          const querySnapshot = await getDocs(calculationsCollectionRef);

          const calculationData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setCalculations(calculationData);
        }
      } catch (error) {
        console.log('Error fetching calculations:', error);
      }
    };

    fetchCalculations();
  }, [user]);

  return (
    <SafeAreaView>
      <ScrollView style={{ width:'100%', height:'100%',backgroundColor:'#95D8B9'}}>
      <View style={{paddingTop:15 }}>
     
      {calculations.map((calculation) => (
        <View key={calculation.id} style={{display:'flex', marginLeft:10, marginRight:10}}>
          <Text style={{fontSize:18, textAlign:'center', paddingBottom:15, fontWeight: 'bold'}}>{calculation.date}</Text>
          <Text style={{fontSize:15, paddingBottom:10}}>Start Location: {calculation.Start}</Text>
          <Text style={{fontSize:15, paddingBottom:10}}>Destination: {calculation.End}</Text>
          <Text style={{fontSize:15, paddingBottom:10}}>Carbon Usage: {calculation.carbonEmissions} kg</Text>
          <Text style={{fontSize:15, paddingBottom:10}}>Transportation Type: {calculation.type}</Text>
          {/* Render other properties of the calculation */}
          <View style={{borderWidth: 0.5,
        borderColor:'black',
        margin:10,}}></View>
        </View>
      ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}


export default History;
