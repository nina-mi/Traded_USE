import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text} from "react-native";
import Button from '../components/Button';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";

// style
import { styles } from '../DefinedStyles';

// This doesn't work yet, the app crashes when I try to import the firebase/firestore module and use these functions

// // intialize services
// const db = getFirestore();

// // collection reference
// const colRefUserInformation = collection(db, "userInformation");

// // get collection data
// getDocs(colRefUserInformation)
//   .then((snapshot) => {
//     let userInformation = [];
//     snapshot.docs.forEach((doc) =>{
//       userInformation.push({ ...doc.data(), id: doc.id });
//     })

//   })
//   .catch(error => {
//     console.log(error.message);
//   })

// function printLeaders() {
//   const q = query(colRefUserInformation, orderBy("nrOfPoints", "desc"), limit(2));
//   getDocs(q).then((snapshot) => {
//     snapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//     });
//   });
// }

export default function LeaderboardScreen({ navigation }) {
  const auth = getAuth();
  user = auth.currentUser;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Leaderboard</Text>

    </View>
  );
}