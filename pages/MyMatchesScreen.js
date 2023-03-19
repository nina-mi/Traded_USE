import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Pressable, Alert} from "react-native";
import Button from '../components/Button';
import { getAuth } from "firebase/auth";
import React from "react";

// style
import { styles } from '../DefinedStyles';

export default function MyMatchesScreen({ navigation }) {
  const auth = getAuth();
  user = auth.currentUser;
  // if (user) {
  // }
  const [number, setNumber] = React.useState(1);

  const getRandomNumber = () => {
      const randomNumber = Math.floor(Math.random() * 9000 + 1000);
      setNumber(randomNumber);
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
              onPress={() => { getRandomNumber(); simpleAlertHandler();}}>
              <Text style = {styles.ButtonText}>Generate</Text>
            </Pressable>
    </View>

  );
}