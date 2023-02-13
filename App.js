import { StatusBar } from "expo-status-bar";
import { StyleSheet, View} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import IntroScreen from './pages/IntroScreen';
import SignUpScreen from './pages/SignUpScreen';

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
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="Hom" component={IntroScreen} />
        <Stack.Screen name="Details" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}