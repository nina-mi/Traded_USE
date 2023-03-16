import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button, Pressable} from "react-native";
//import Button from '../components/Button';

// style
import { styles } from '../DefinedStyles';

export default function IntroScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style = {styles.title}>TRADED</Text>
            {/* <Text>Join the movement of sustainable fashion and make a real impact on the environment by trading your clothes</Text> */}
            {/* <Text>Stop contributing to the cycle of fast fashion and consumerism</Text> */}
            <Text>Join the movement of sustainable fashion and make a real impact on the environment</Text>
            
            <Pressable 
                style = {styles.PrimaryButton} 
                onPress={() => navigation.navigate('Sign up')}>
                <Text style = {styles.ButtonText}>Sign up</Text>
            </Pressable>
            
            
            <Pressable 
                style = {styles.PrimaryButton} 
                onPress={() => navigation.navigate('Log in')}>
                <Text style = {styles.ButtonText}>Log in</Text>
            </Pressable>
        </View>
    );

}
