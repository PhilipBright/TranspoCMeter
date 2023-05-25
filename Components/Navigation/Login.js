    import { Text, View, Image, StyleSheet, Keyboard } from 'react-native';
    import { TextInput, Button } from 'react-native-paper';
    import { useNavigation } from '@react-navigation/native';
    import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
    import { initializeApp } from 'firebase/app';
    import { firebaseConfig } from '../../firebase/firebaseConfig';
    import React from 'react';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import sticker from '../../assets/loginSticker.png';
    import { KeyboardAvoidingView } from 'react-native';
    import { TouchableWithoutFeedback } from 'react-native';

    export default function Login({ signIn }) {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigateToSignUp = () => {
    navigation.navigate('SignUp');
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);


    const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
    console.log('Sign in completed');
    const user = userCredential.user;
    navigation.navigate('NavigationArea');
    console.log(user);
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
    });
    };

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        
    <View style={styles.login}>
    
    <View style={styles.heading}>
    <Text style={{ fontSize: 40, fontFamily: 'Cochin' }}>Login</Text>
    </View>
    <View style={{ width: '100%', height: '35%', marginBottom:40, marginTop:20 }}>
    <Image source={sticker} style={{ width: '100%', height: '100%', position:'relative' }}  />
    </View>
    
    <View>
    <TextInput
    label="Enter your Email"
    value={email}
    onChangeText={setEmail}
    mode="outlined"
    style={{ marginBottom: 10 }}
    />
    <TextInput
            label="Enter your Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
        />
    <View style={{ width: '100%', height: 70, alignItems: 'center', justifyContent: 'center', paddingTop: 10,  }}>
    <Button mode="contained" onPress={handleSignIn} style={{ width: '55%', height: '80%', alignItems: 'center', backgroundColor: '#04BA04', marginTop:20 }}>
    <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
    <Text style={{ fontSize: 20, alignItems: 'center', justifyContent: 'center', color: 'white' }}>Sign in</Text>
    </View>
    </Button>
    </View>
    <View style={{ flexDirection: 'row', paddingTop:50, justifyContent:'center' }}>
    <Text>Don't have an account? </Text>
    <Text style={{ color: 'green' }} onPress={navigateToSignUp}>Create New Account</Text>
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