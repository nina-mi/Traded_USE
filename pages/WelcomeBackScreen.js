import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text,  Button, Pressable} from "react-native";
// import Button from '../components/Button';
import { getAuth } from "firebase/auth";
import { LogBox } from 'react-native';

// style
import { styles } from '../DefinedStyles';

export default function WelcomeBackScreen({ navigation }) {
  LogBox.ignoreLogs(['Warning: ...']);
  const auth = getAuth();
  user = auth.currentUser;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.browseItemText}>Welcome back {user.displayName}!</Text>
        <View style={styles.buttonView}>
          <Pressable 
            style = {styles.PrimaryButtonBig} 
            onPress={ () => navigation.navigate("TabStackScreen")}>
            <Text style = {styles.ButtonText}>-></Text>
          </Pressable>
        </View>
    </View>
  );
}
