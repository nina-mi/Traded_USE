import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button, Pressable} from "react-native";
// import Button from '../components/Button';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

// style
import { styles } from '../DefinedStyles';

async function addNewUserPoints() {
  const auth = getAuth();
  user = auth.currentUser;
  const db = getFirestore();
  try {
    const docRef = await addDoc(collection(db, "userInformation"), {
      nrOfPoints: 0,
      userID: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default function WelcomeScreen({ navigation }) {
  addNewUserPoints();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome</Text>
        <Text>Welcome to TRADED, where you trade clothes with other like-minded individuals who are committed to reducing fast fashion and consumerism.</Text>
        <Text>To get started, create a profile of an item of clothing you have and would like to trade.</Text>
        <Text>Once you add your item, you can begin browsing other profiles and start trading with other users.</Text>
        <Pressable 
          style = {styles.PrimaryButton} 
          onPress={ () => navigation.navigate("TabStackScreen")}>
          <Text style = {styles.ButtonText}>-></Text>
        </Pressable>
    </View>
  );
}