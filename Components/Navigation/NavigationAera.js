
import { StyleSheet, Text, View} from 'react-native';

import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Tracking from './Tracking';
import Setting from './Setting';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function NavigationArea() {
  
  return (
    
    <NavigationContainer>
     
    <Tab.Navigator
    
     screenOptions={({ route  }) => ({
      headerShown: false,
      tabBarStyle:{
        // borderTopLeftRadius: 50,
        // borderTopRightRadius: 50,

        height: 90,
        backgroundColor: '#ffffff',
        color:'black',
        
      },
      

      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
       
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Tracking') {
          iconName = focused ? 'navigate' : 'navigate-outline';
        }
        else if (route.name === 'Setting') {
          iconName = focused ? 'settings' : 'settings-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#9D7EE3',
      tabBarInactiveTintColor: '#948F8F',

    })} 
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Tracking" component={Tracking} />
      <Tab.Screen name="Setting" component={Setting} />
      
    </Tab.Navigator>
  
  </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  
});
