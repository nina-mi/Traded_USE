import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text,  Button} from "react-native";
// import Button from '../components/Button';
import { getAuth } from "firebase/auth";


export default function WelcomeBackScreen({ navigation }) {
  const auth = getAuth();
  user = auth.currentUser;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome back {user.displayName}!</Text>
        <Button
        // TODO change to arrow icon
            title="->"
            onPress={() => navigation.navigate("TabStackScreen")}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});