import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, SafeAreaView, View, ScrollView } from 'react-native';
import { Button,  Text } from 'react-native-paper';
import {  StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
const GOOGLE_API_KEY = 'AIzaSyBgW215Zkb9oFkJuQa4VVK53O7Jlppq4gc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



function Tracking() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('MapLocation');
  };
  const [selectedType, setSelectedType] = useState(null);

  const handleCheckboxPress = (Type) => {
    setSelectedType(Type);}
    const [startLocation, setStartLocation] = useState(null);
    const [destination, setDestination] = useState(null);

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#8CC6F9'}}>
 
      <View style={{display:'flex', marginTop:50, justifyContent:'center', alignItems:'center' ,backgroundColor:'white',margin:20, padding:5, borderRadius:10}}>
        <Text style={{ textAlign: 'center', fontWeight:'500' }}  variant="headlineSmall">
        Please choose your transportation type to start tracking
        </Text>
      </View>

      <View style={{display:'flex', flexDirection: 'row', justifyContent:'space-around', paddingLeft:10, marginTop:30, marginBottom:30 }}>
      <Checkbox.Item
        label="Car"
        status={selectedType === 'car' ? 'checked' : 'unchecked'}
        onPress={() => handleCheckboxPress('car')}
      />
      <Checkbox.Item
        label="Motorcycle"
        status={selectedType === 'motorcycle' ? 'checked' : 'unchecked'}
        onPress={() => handleCheckboxPress('motorcycle')}
      />
      <Checkbox.Item
        label="Train"
        status={selectedType === 'train' ? 'checked' : 'unchecked'}
        onPress={() => handleCheckboxPress('train')}
      />
    </View>
    {selectedType && <Text>{`Selected car: ${selectedType}`}</Text>}

    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder='Start location'
        onPress={(data, details = null) => {
          setStartLocation(data.description);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
        }}
        defaultValue={startLocation}
        styles={autocompleteStyles}
      />
      <GooglePlacesAutocomplete
        placeholder='Destination'
        onPress={(data, details = null) => {
          setDestination(data.description);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
        }}
        defaultValue={destination}
        styles={autocompleteStyles}
      />
    </View>

      <View style={{marginBottom:80, display:'flex', alignItems:'center' }}>
      <Button style={{backgroundColor:'#0B82E9', width:'50%'}} icon="" mode="contained" onPress={handlePress}>
         <Text style={{color:'white'}}>Go to Map View</Text>
      </Button>
  </View>
  
    </SafeAreaView>
  );
}

export default Tracking;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    paddingHorizontal: 12,
  },
});

const autocompleteStyles = StyleSheet.create({
  container: {
    flex: 0,
    marginBottom: 8,
  },
});
