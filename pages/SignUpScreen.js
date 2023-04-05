import { NavigationContainer, CommonActions } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button, Alert, Pressable} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.config";
import React from "react";
import { TextInput } from "react-native-paper";

// style
import { styles } from '../DefinedStyles';
import { colors } from "../Colors";

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
            <View  style={{paddingTop: 15}}>
              <Text style={{fontWeight: 'bold'}}>Email</Text>
              <TextInput
              onChangeText={(text) => setEmail(text)} placeholder="user@mail.com"
              mode="outlined"
              style={styles.textInput}
              activeOutlineColor={colors.app_evergreen_brighter}/>
            </View>

            <View  style={{paddingTop: 15}}>
            <Text style={{fontWeight: 'bold'}}>Password</Text>
              <TextInput            
              onChangeText={(text) => setPassword(text)} placeholder="password123"
              mode="outlined"
              secureTextEntry={true}
              style={styles.textInput}
              activeOutlineColor={colors.app_evergreen_brighter}/>
            </View>

            <View style={styles.buttonView}>
              <Pressable 
                style = {styles.PrimaryButton} 
                onPress={ handleCreateAccount }>
                <Text style = {styles.ButtonText}>Sign up</Text>
              </Pressable>
            </View>
        </View>
    );
  }