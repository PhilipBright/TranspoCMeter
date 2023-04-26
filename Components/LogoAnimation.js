import React, { Component } from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native';
import Lottie from 'lottie-react-native';
export default function LogoAnimation() {
    

  
    return (
      <View>
        <LottieView
      autoplay
      loop
      source={require('../assets/welcome.json')}
      colorFilters={[{keypath: 'Plane', color: 'rgb(255, 100, 0)'}]}
    />
      </View>
    )
  
}
