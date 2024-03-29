import { NavigationContainer, CommonActions } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button, Alert, Pressable} from "react-native";
import { TextInput } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.config"
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { LogBox } from 'react-native';

// style
import { styles } from '../DefinedStyles';
import { colors } from "../Colors";


export default function LogInScreen({ navigation }) {
  LogBox.ignoreLogs(['Warning: ...']);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Signed in!')
      const user = userCredential.user;
      console.log(user)
      navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                {
                    name: "Welcome back",
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
      <ScrollView>
        <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 25 }}>
            <Text style={{fontWeight: 'bold'}}>Fill in your credentials</Text>
            {/* <Button title="Log in" onPress={() => navigation.navigate('Welcome')} /> */}
            {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
            <View  style={{paddingTop: 15}}>
              <Text style={{fontWeight: 'bold'}}>Email</Text>
              <TextInput
                mode="outlined"
                style={styles.textInput}
                activeOutlineColor={colors.app_evergreen_brighter}

                onChangeText={(text) => setEmail(text)} placeholder="user@mail.com"/>
            </View>

            <View  style={{paddingTop: 15}}>
              <Text style={{fontWeight: 'bold'}}>{'\n'}Password</Text>
              <TextInput
                mode="outlined"
                secureTextEntry={true}
                style={styles.textInput}
                activeOutlineColor={colors.app_evergreen_brighter}
                onChangeText={(text) => setPassword(text)} placeholder="password123"/>
            </View>
            <View style={styles.buttonView}>
              <Pressable
                style = {styles.PrimaryButtonBig} 
                onPress={ handleSignIn }>
                <Text style = {styles.ButtonText}>Log in</Text>
              </Pressable>
            </View>
        </View>
      </ScrollView>
    );
  }

