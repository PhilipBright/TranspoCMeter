import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, SafeAreaView, View, ScrollView, Image } from 'react-native';
import { Button,  Text } from 'react-native-paper';
import {  StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
const GOOGLE_API_KEY = 'AIzaSyBgW215Zkb9oFkJuQa4VVK53O7Jlppq4gc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RadioButton } from 'react-native-paper';

function Tracking() {
  const navigation = useNavigation();
  const options = [
    {
      label: 'Car',
      value: 'car',
      icon: require('../../assets/car.png'),
    },
    {
      label: 'Motorcycle',
      value: 'motorcycle',
      icon: require('../../assets/motorcycle.png'),
    },
    {
      label: 'Train',
      value: 'train',
      icon: require('../../assets/train.png'),
    },
  ];

  
  const [selectedType, setSelectedType] = useState('car');

  const handleRadioPress = (value) => {
    setSelectedType(value);
  };
 const [startLocation, setStartLocation] = useState(null);
const [destination, setDestination] = useState(null);

const onPressStartAddress = (data, details) => {
  // 'details' is provided when fetchDetails = true
  const lat = details.geometry.location.lat;
  const lng = details.geometry.location.lng;
  setStartLocation(details);
};

const onPressDestinationAddress = (data, details) => {
  // 'details' is provided when fetchDetails = true
  const lat = details.geometry.location.lat;
  const lng = details.geometry.location.lng;
  setDestination(details);
};

const MapHandlePress = () => {
  if (startLocation && destination) {
    const startLat = startLocation.geometry.location.lat;
    const startLng = startLocation.geometry.location.lng;
    const destLat = destination.geometry.location.lat;
    const destLng = destination.geometry.location.lng;
    navigation.navigate('MapLocation', {  pickCords: { latitude: startLat, longitude: startLng },
    dropCords: { latitude: destLat, longitude: destLng },
    type: selectedType });
  }
  else {
    alert('Please enter start location and destination')
  }
};
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#95D8B9'}}>
 
      <View style={{display:'flex', marginTop:50, justifyContent:'center', alignItems:'center' ,backgroundColor:'white',margin:20, padding:5, borderRadius:10}}>
        <Text style={{ textAlign: 'center', fontWeight:'500', padding:10 }}  variant="headlineSmall">
        Please choose your transportation type to start tracking
        </Text>
      </View>

      <View style={styles.container}>
      
<GooglePlacesAutocomplete
  placeholder='Start location'
  onPress={onPressStartAddress}
  fetchDetails={true}
  query={{
    key: GOOGLE_API_KEY,
    language: 'en',
  }}
  defaultValue={startLocation ? startLocation.description : ''}
  styles={autocompleteStyles}
/>
<GooglePlacesAutocomplete
  placeholder='Destination'
  onPress={onPressDestinationAddress}
  fetchDetails={true}
  query={{
    key: GOOGLE_API_KEY,
    language: 'en',
  }}
  defaultValue={destination ? destination.description : ''}
  styles={autocompleteStyles}
/>
    </View>

      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingLeft:10, marginBottom: 30, zIndex:0 }}>
      {options.map((option, index) => (
        <View key={index} style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', }}>
          <Image source={option.icon} style={{ width: 50, height: 50, marginRight:10 }} />
          <RadioButton
            value={option.value}
            status={selectedType === option.value ? 'checked' : 'unchecked'}
            onPress={() => handleRadioPress(option.value)}
            color="#6200ee"
            uncheckedColor="#aaa"
            borderWidth={1}
            borderColor="black"
            width={38}
            height={37}
            
          />
         
        </View>
      ))}
    </View>

      <View style={{marginBottom:100, display:'flex', alignItems:'center' }}>
      <Button style={{backgroundColor:'#0B82E9', width:'50%', height:55,  display:'flex', justifyContent:'center'}} icon="" mode="contained" onPress={MapHandlePress}>
         <Text style={{color:'white', fontSize:16, fontWeight:'500'}}>Go to Map View</Text>
      </Button>
  </View>
  
    </SafeAreaView>
  );
}

export default Tracking;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    paddingHorizontal: 12,
  },
  icon:{
    width: 50,
    height: 50,
  },
 
});

const autocompleteStyles = StyleSheet.create({
  container: {
    position:'relative',
    flex: 0,
    marginBottom: 8,
    zIndex: 1,
  },
 
 
});
