import React from 'react';
import { SafeAreaView, StatusBar, Image, StyleSheet, Text, View, ScrollView } from 'react-native';

const CarbonSource = ({ source, value }) => {
  return (
    <View style={styles.carbonSourceContainer}>
      <Text style={styles.carbonSourceText}>{source}</Text>
      <Text style={styles.carbonSourceValue}>{value} g</Text>
    </View>
  );
};

const Profile = ({username}) => {
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

const Home = () => {
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
     <Profile username="Philip Bright"/>

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
        <Text style={styles.carbonSpendingValue}>211 g</Text>
        </View>

        <CarbonSource source="Car" value={258} />
        <CarbonSource source="Motorcycle" value={87} />
        <CarbonSource source="Train" value={858} />
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