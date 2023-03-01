import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text} from "react-native";
import Button from '../components/Button';
import { getAuth } from "firebase/auth";


export default function LeaderboardScreen({ navigation }) {
//   const auth = getAuth();
//   user = auth.currentUser;
  // if (user) {
  // }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Leaderboard</Text>
    </View>
  );
}