import React from 'react'
import { View } from 'react-native-ui-lib'
import { StyleSheet, Text,  Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import Signin from '../Navigation/Login'
import { KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { Image } from 'react-native';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase/firebaseConfig';
import { auth } from '../../firebase/firebaseConfig';
import signupSticker from '../../assets/signup.png';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import {useEffect} from 'react'


export default function Signup() {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const navigation = useNavigation();
    const navigateToSignIn = () => {
        navigation.navigate('Login');
        };

    const goToSignIn = () => {
      navigation.navigate('Login');
    };
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    const handleSignUp = async () => {
        const auth = getAuth();
        const db = getFirestore();
        
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          const userData = {
            username: username,
            email: email,
            password: password
            // other user data
          };
    
          const userRef = doc(collection(db, 'users'), user.uid);
          await setDoc(userRef, userData);
    
          console.log('User created successfully!');
        } catch (error) {
          console.log('Error creating user:', error.message);
        }
      };

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        
    <View style={styles.login}>
    
    <View style={styles.heading}>
    <Text style={{ fontSize: 40, fontFamily: 'Cochin' }}>Create Your Account</Text>
    </View>
    <View style={{ width: '100%', height: '35%', marginBottom:20, marginTop:20 }}>
    <Image source={signupSticker} style={{ width: '100%', height: '100%', position:'relative' }}  />
    </View>
    
    <View>
    <TextInput
    label="Enter your Username"
    value={username}
    onChangeText={setUsername}
    mode="outlined"
    style={{ marginBottom: 10 }}
    />
    <TextInput
    label="Enter your Email"
    value={email}
    onChangeText={setEmail}
    mode="outlined"
    style={{ marginBottom: 10 }}
    />
    <TextInput
    label="Enter your Password"
    secureTextEntry
    value={password}
    onChangeText={setPassword}
    mode="outlined"
    style={{ marginBottom: 10 }}
    />
   
    <View style={{ width: '100%', height: 70, alignItems: 'center', justifyContent: 'center', paddingTop: 10,  }}>
    <Button mode="contained" onPress={handleSignUp} style={{ width: '55%', height: '80%', alignItems: 'center', backgroundColor: '#04BA04', marginTop:20 }}>
    <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
    <Text style={{ fontSize: 17, alignItems: 'center', justifyContent: 'center', color: 'white' }}>Create New Account</Text>
    </View>
    </Button>
    </View>
    <View style={{ flexDirection: 'row', paddingTop:35, justifyContent:'center' }}>
    <Text>Already have an account? </Text>
    <Text style={{ color: 'green' }} onPress={navigateToSignIn}>Go to Login</Text>
    </View>
    </View>
    
    </View>
    
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
    }

    const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#95D8B9'
    backgroundColor:'#8CC6F9'
    },
    login: {
    width: '90%',
    height: '90%',
    paddingTop:30,
   
    },
    heading: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    },
    });
