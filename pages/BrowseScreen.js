import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text} from "react-native";
import Button from '../components/Button';
import { getAuth } from "firebase/auth";

// style
import { styles } from '../DefinedStyles';

export default function BrowseScreen({ navigation }) {
  const auth = getAuth();
  user = auth.currentUser;
  // if (user) {
  // }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Browse</Text>
    </View>
  );
}