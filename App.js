import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// components
import ImageViewer from './components/ImageViewer';
// import Button from './components/Button';

// screens
import IntroScreen from './pages/IntroScreen';
import SignUpScreen from './pages/SignUpScreen';
import LogInScreen  from './pages/LogInScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import AddProfileInfoScreen from './pages/AddProfileInfoScreen';
import WelcomeBackScreen from './pages/WelcomeBackScreen';
import TabStackScreen from './pages/TabStackScreen';


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

function Page1({ navigation }){
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>Page1</Text>
      <Button
            title="Go to next page"
            onPress={() => navigation.navigate("Page2Stack")}
            />
    </View>
  );
}

function Page2Stack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Page2A" component={Page2A}/>
      <Tab.Screen name="Page2B" component={Page2B}/>
    </Tab.Navigator>
  );
}

function Page2A() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>Page A</Text>
    </View>
  );
}

function Page2B() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>Page B</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
      {/* this would delete the header in all pages */}
      {/* screenOptions = {{headerShown: false} } */}
        <Stack.Screen name="Intro" component={IntroScreen} options={{headerShown: false}} />
        <Stack.Screen name="Sign up" component={SignUpScreen} />
        <Stack.Screen name="Log in" component={LogInScreen} />
        <Stack.Screen name="AddProfileInfo" component={AddProfileInfoScreen} options={{headerShown: false}} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Welcome back" component={WelcomeBackScreen} options={{headerShown: false}} />
        <Stack.Screen name="TabStackScreen" component={TabStackScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default function App() {
//   return(
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Page1">
//         <Stack.Screen name="Page1" component={Page1}/>
//         <Stack.Screen name="Page2Stack" component={Page2Stack}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }