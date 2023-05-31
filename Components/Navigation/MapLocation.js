import { StatusBar } from 'expo-status-bar';
import { Dimensions, SafeAreaView, StyleSheet,  TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import MapView, {Marker}  from 'react-native-maps';
import { useState, useRef } from 'react';
import MapViewDirections from 'react-native-maps-directions';
const GOOGLE_API_KEY = 'AIzaSyBgW215Zkb9oFkJuQa4VVK53O7Jlppq4gci';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * 1.5;

const MapLocation = ({route}) => {
  const [distance, setDistance] = useState(0);
  function haversineDistance(coords1, coords2) {
    const earthRadius = 6371; // in kilometers
    const latDiff = (coords2.latitude - coords1.latitude) * Math.PI / 180;
    const lonDiff = (coords2.longitude - coords1.longitude) * Math.PI / 180;
    const lat1 = coords1.latitude * Math.PI / 180;
    const lat2 = coords2.latitude * Math.PI / 180;
  
    const a = Math.sin(latDiff / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(lonDiff / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadius * c; // in kilometers
  
    return distance * 1000; // convert to meters
  }
  
  const [state, setState] = useState({
    pickCords: route.params.pickCords,
    dropCords: route.params.dropCords
  });
  
  // output: 1383.76 meters

  useEffect(() => {
    const distance = Math.round(haversineDistance(state.pickCords, state.dropCords));
    setDistance(distance);
  }, [state.pickCords, state.dropCords]);
  
const mapRef = useRef()
const {pickCords, dropCords} = state
const type = route.params.type;
const startPlace = route.params.start;
const endPlace = route.params.end;
const navigation = useNavigation();
const ResultHandlePress = () => {
  navigation.navigate('Result', {distance: distance, type: type, start: startPlace, end: endPlace},
  );
};



  return (
    <SafeAreaView style={styles.container}>
      
      <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFill}
      initialRegion={{
        ...pickCords,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      >
      <Marker
      coordinate={pickCords}
      />
      <Marker coordinate={dropCords} />
      <MapViewDirections
    origin={{
      ...pickCords,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }}
    destination={{
      ...dropCords,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }}
    apikey={GOOGLE_API_KEY}
    strokeWidth={5}
    strokeColor='hotpink'
    optimizeWaypoints={true}
    onReady={result => {
      mapRef.current.fitToCoordinates(result.coordinates, {
        edgePadding:{
          right:30,
          bottom:30,
          left:30,
          top:100
        },
        // animated:true
      })
    }}
  />
      </MapView>
      <View style={{position:'absolute' , bottom:0, width:'100%', backgroundColor:'#ffffff'}}>
    <Text style={{textAlign:'center', fontWeight:'bold', padding:10}} variant="titleMedium" >Distance</Text>
      <Text id='distance' style={{textAlign:'center', fontWeight:'bold', padding:10}} variant="displaySmall" >
      {distance} km
      </Text>
      
      <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding:20 }}>
<Button style={{ width: 170, height: 45, backgroundColor:'#0B82E9' }} mode="contained" onPress={ResultHandlePress}>
  <Text style={{textAlign:'center', color:'white',}} variant="titleMedium">Confirm</Text>
</Button>

</View>

    </View>
    
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFFF'
  },

});
export default MapLocation;
