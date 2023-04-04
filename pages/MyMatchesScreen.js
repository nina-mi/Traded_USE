import { StyleSheet, View, Text, Pressable, Alert} from "react-native";
import { initializeApp } from "firebase/app";
import { secondaryAppConfig } from "../firebase.config";
import React from "react";
import 'firebase/compat/storage';
import { getStorage, uploadBytes} from "firebase/storage";
import firebase from 'firebase/app';
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// style
import { styles } from '../DefinedStyles';
import { getDatabase, ref, onValue, set } from "firebase/database";

// import { getAnalytics } from "firebase/analytics";

export default function MyMatchesScreen({ navigation }) {
  const app2 = initializeApp(secondaryAppConfig, "Secondary");

  const [number, setNumber] = React.useState("1793");

  // const analytics = getAnalytics();

  const getRandomNumber = async () => {
      const randomNumber = Math.floor(Math.random() * 9000 + 1000);
      setNumber(randomNumber);
  }

  function generateCode() {
    const db2 = getDatabase(app2);
    const reference = ref(db2, 'AccessCodes/');
    set(reference, {
      Code: number,
      }
    );
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