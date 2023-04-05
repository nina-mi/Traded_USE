import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button, Pressable} from "react-native";
// import Button from '../components/Button';
import { getAuth } from "firebase/auth";

// style
import { styles } from '../DefinedStyles';


export default function WelcomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.title}>Welcome</Text>
        <Text style = {styles.paragraph}>Welcome to TRADED, where you trade clothes with other like-minded individuals who are committed to reducing fast fashion and consumerism.</Text>
        <Text style = {styles.paragraph}>To get started, create a profile of an item of clothing you have and would like to trade.</Text>
        <Text style = {styles.paragraph}>Once you add your item, you can begin browsing other profiles and start trading with other users.</Text>
        <View  style={styles.buttonView}>        
          <Pressable 
            style = {styles.PrimaryButtonBig} 
            onPress={ () => navigation.navigate("TabStackScreen")}>
            <Text style = {styles.ButtonText}>-></Text>
          </Pressable>
        </View> 
    </View>
  );
}