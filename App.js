import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase"
// import { firebaseConfig } from "../firebase.config"

// components
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';

// screens
import IntroScreen from './pages/IntroScreen';
import SignUpScreen from './pages/SignUpScreen';
import LogInScreen  from "./pages/LogInScreen";
import WelcomeScreen from "./pages/WelcomeScreen";
import AddProfileInfoScreen from './pages/AddProfileInfoScreen';

const PlaceholderImage = require("./assets/images/fast_fashion.jpeg");
const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.imageContainer}>
//         <ImageViewer placeholderImageSource={PlaceholderImage} />
//       </View>
//       <View style={styles.footerContainer}>
//         <Button label="Choose a photo" />
//         <Button label="Use this photo" />
//       </View>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
      {/* this would delete the header in all pages */}
      {/* screenOptions = {{headerShown: false} } */}
        <Stack.Screen name="Intro" component={IntroScreen} options={{headerShown: false}} />
        <Stack.Screen name="Sign up" component={SignUpScreen} />
        <Stack.Screen name="Log in" component={LogInScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="AddProfileInfo" component={AddProfileInfoScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}