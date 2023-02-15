import { ScrollView, StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import NavigationArea from './Components/Navigation/NavigationAera';
import LogoAnimation from './Components/LogoAnimation'
import Lottie from 'lottie-react-native';
export default function App() {
  return (
    // <ScrollView>
    <View style={{flex: 1, backgroundColor: '#8CC6F9'}}>
     
    {/* <LogoAnimation/>   */}
    <NavigationArea />
    
    </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
