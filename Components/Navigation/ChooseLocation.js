import React from 'react'
import { View } from 'react-native'
const GOOGLE_API_KEY = 'AIzaSyBgW215Zkb9oFkJuQa4VVK53O7Jlppq4gc';


function ChooseLocation() {
  return (
    <View>
         <GooglePlacesAutocomplete
       style={{}}
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: GOOGLE_API_KEY,
        language: 'en',
      }}
    />
    </View>
  )
}

export default ChooseLocation