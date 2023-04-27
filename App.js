import 'react-native-gesture-handler';

import { StyleSheet, Text, View } from 'react-native';
import NavigationArea from './Components/Navigation/NavigationAera';

import {withAuthenticator} from 'aws-amplify-react-native';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// philip123
// Myanmar2023





Amplify.configure({...awsconfig, Analytics: {disabled: true}});
 const App = () => {
  return (
    <SafeAreaProvider>
   
    <NavigationArea/>

    </SafeAreaProvider>
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
const signUpConfig = {
  header: "My Customized Sign Up",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Full name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};

export default withAuthenticator(App, {signUpConfig});