import { NavigationContainer, CommonActions } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, TextInput, Button, Alert, Pressable} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.config";
import React from "react";

// style
import { styles } from '../DefinedStyles';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Account created.')
      const user = userCredential.user;
      console.log(user)
      navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                {
                    // name: 'Welcome',
                    name: "AddProfileInfo",
                },
            
            ],
        })
      )
    })
    .catch(error => {
      console.log(error);
      Alert.alert(error.message);
    })
  }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontWeight: 'bold'}}>{'\n'}Please create an account</Text>
            {/* <Button title="Log in" onPress={() => navigation.navigate('Welcome')} /> */}
            {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
            <View>
              <Text style={{fontWeight: 'bold'}}>{'\n'}Email</Text>
              <TextInput label={"Email"} onChangeText={(text) => setEmail(text)} placeholder="user@mail.com"/>
            </View>
            <View>
            <Text style={{fontWeight: 'bold'}}>{'\n'}Password</Text>
              <TextInput label={"Password"} onChangeText={(text) => setPassword(text)} placeholder="password123"/>
            </View>
            <Pressable 
              style = {styles.PrimaryButton} 
              onPress={ handleCreateAccount }>
              <Text style = {styles.ButtonText}>Sign up</Text>
            </Pressable>
        </View>
    );
  }