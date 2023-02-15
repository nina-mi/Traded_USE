import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text} from "react-native";
import Button from '../components/Button';


export default function WelcomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Welcome</Text>
          <Text>Welcome to TRADED, where you trade clothes with other like-minded individuals who are committed to reducing fast fashion and consumerism.</Text>
          <Text>To get started, create a profile of an item of clothing you have and would like to trade.</Text>
          <Text>Once you add your item, you can begin browsing other profiles and start trading with other users.</Text>
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