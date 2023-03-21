import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Pressable, Alert} from "react-native";
import Button from '../components/Button';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.config";
import React from "react";
import 'firebase/compat/storage';
import { getStorage, ref, uploadBytes} from "firebase/storage";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// style
import { styles } from '../DefinedStyles';
import { getDatabase, ref, onValue, set } from "firebase/database";


export default function MyMatchesScreen({ navigation }) {

  const [number, setNumber] = React.useState(1);


  
  const getRandomNumber = () => {
      const randomNumber = Math.floor(Math.random() * 9000 + 1000);
      setNumber(randomNumber);

  }
  function generateCode() {
    const db2 = getDatabase();
    const reference = ref(db2, 'AccessCodes/');
    set(reference, {
      Code: number,
  });
}

const simpleAlertHandler = () => {
  //function to make simple alert
  alert(number);
};
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Press the button below to generate your locker access code</Text>
        <Pressable 
              style = {styles.PrimaryButton} 
              onPress={() => { getRandomNumber(); simpleAlertHandler();generateCode()}}>
              <Text style = {styles.ButtonText}>Generate</Text>
            </Pressable>
    </View>

  );
}