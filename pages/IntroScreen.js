import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button} from "react-native";
//import Button from '../components/Button';

export default function IntroScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>TRADED</Text>
            {/* <Text>Join the movement of sustainable fashion and make a real impact on the environment by trading your clothes</Text> */}
            {/* <Text>Stop contributing to the cycle of fast fashion and consumerism</Text> */}
            <Text>Join the movement of sustainable fashion and make a real impact on the environment</Text>
            <Button
            title="Sign up"
            onPress={() => navigation.navigate('Sign up')}
            />
            <Button
            title="Log in"
            onPress={() => navigation.navigate('Log in')}
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
