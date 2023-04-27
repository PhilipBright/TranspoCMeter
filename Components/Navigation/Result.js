import React from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import bulb from '../../assets/bulb.png';
function Result() {
    const navigation = useNavigation();
   const ThanksHandlePress = () => {
    navigation.navigate('Home');
    }
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#95D8B9'}}>
        {/* result */}
        <View style={styles.firstContainer}>
            <View style={styles.resultContainer}>
            <View style={{display:'flex', alignItems:'center', width:'55%',height:'100%', padding:10, }}>
                <Text variant='titleLarge' style={{fontWeight:'500', paddingTop:10, color:'#005BA9' }}>Carbon Emission</Text>
                <Text variant='titleLarge' style={{fontWeight:'bold', paddingTop:18 }}>20g</Text>
             </View>
             <View style={{display:'flex', alignItems:'center',  width:'45%',height:'100%', padding:10, }}>
                <Text variant='titleLarge' style={{fontWeight:'500', paddingTop:10, color:'#005BA9' }}>Distance</Text>
                <Text variant='titleLarge' style={{fontWeight:'bold', paddingTop:18 }}>1264 km</Text>
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
                <Text style={{padding:15,  textAlign:'justify'}} variant='bodyLarge'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</Text>
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
