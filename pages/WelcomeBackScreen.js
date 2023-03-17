import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text,  Button, Pressable} from "react-native";
// import Button from '../components/Button';
import { getAuth } from "firebase/auth";

// style
import { styles } from '../DefinedStyles';

export default function WelcomeBackScreen({ navigation }) {
  const auth = getAuth();
  user = auth.currentUser;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome back {user.displayName}!</Text>
        <Pressable 
          style = {styles.PrimaryButton} 
          onPress={ () => navigation.navigate("TabStackScreen")}>
          <Text style = {styles.ButtonText}>-></Text>
        </Pressable>
    </View>
  );
}
