import { NavigationContainer, CommonActions } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, TextInput, Button, Alert} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.config"
import React from "react"

// import Button from '../components/Button';

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
                    name: 'Welcome',
                },
            
            ],
        })
      )
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error.messsage)
    })
  }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Please create an account</Text>
            {/* <Button title="Log in" onPress={() => navigation.navigate('Welcome')} /> */}
            {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
            <View>
              <Text>Email</Text>
              <TextInput onChangeText={(text) => setEmail(text)} placeholder="user@mail.com"/>
            </View>
            <View>
              <Text>Password</Text>
              <TextInput onChangeText={(text) => setPassword(text)} placeholder="password123"/>
            </View>
            <Button
                title="Sign up"
                onPress={ handleCreateAccount }
            />
        </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});