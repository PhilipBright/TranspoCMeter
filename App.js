import 'react-native-gesture-handler';
import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
// import Login from './Components/Navigation/Login';
// import Signup from './Components/Navigation/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import SignInForm from './Components/Navigation/Login';
import SignUpForm from './Components/Navigation/Signup';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase/firebaseConfig';
import HomeScreen from './Components/Navigation/Home';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import NavigationArea from './Components/Navigation/NavigationAera';

// philip123
// Myanmar2023
const Stack = createStackNavigator();


 const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    // Check authentication status when the component mounts
    checkAuthenticationStatus();
  }, []);

  const checkAuthenticationStatus = async () => {
    try {
      // Retrieve the authentication status from storage
      const authStatus = await AsyncStorage.getItem('authStatus');
      if (authStatus === 'authenticated') {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('Error retrieving authentication status:', error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <Stack.Navigator>
      {isAuthenticated ? (
      <Stack.Screen name="NavigationArea" component={NavigationArea} options={{
          headerLeft: null,
          headerShown: false  // Hide the back button
        }} />
      ) : (
        <>
        <Stack.Screen name="Login" component={SignInForm} options={{
          headerLeft: null,
          headerShown: false  // Hide the back button
        }}  />
        <Stack.Screen name="SignUp" component={SignUpForm} options={{
          headerLeft: null,
          headerShown: false  // Hide the back button
        }} />
        <Stack.Screen name="NavigationArea" component={NavigationArea} options={{
          headerLeft: null,
          headerShown: false  // Hide the back button
        }} />
      </>
      )}
       
        {/* Add more screens and their components here */}
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
};
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});


export default App