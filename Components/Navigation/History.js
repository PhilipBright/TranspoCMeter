import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { collection, getFirestore, doc, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../../firebase/firebaseConfig';
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth'; // Assuming you have a custom hook for accessing the authenticated user


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
      <View style={{ width:'100%', backgroundColor:'red'}}>
      <Text style={{fontSize: 50}}>Calculation List</Text>
      {calculations.map((calculation) => (
        <View key={calculation.id} style={{ paddingBottom:10}}>
          <Text style={{}}>Start Location: {calculation.Start}</Text>
          <Text>Destination: {calculation.End}</Text>
          <Text>Carbon Usage: {calculation.carbonEmissions} kg</Text>
          <Text>Transportation Type: {calculation.type}</Text>
          {/* Render other properties of the calculation */}
        </View>
      ))}
      </View>
     <View style={{ width:'100%', height:'50%', backgroundColor:'blue'}}>

     </View>
    </SafeAreaView>
  );
}

export default History;
