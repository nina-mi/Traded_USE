import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button, Pressable, Image} from "react-native";
//import Button from '../components/Button';

// style
import { styles } from '../DefinedStyles';
//cant find image for some reason
//const logo = require('./assets/images/logo.jpg');
export default function IntroScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={{flex: 0.3}}>
            {/*<Image source={logo} />*/}
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 0.7 }}>
            <Text style = {styles.title}>TRADED</Text>
            <Text>Join the movement of sustainable fashion and make a real impact on the environment by trading your clothes</Text>
            {/* <Text>Stop contributing to the cycle of fast fashion and consumerism</Text> */}
            <Text>Join the movement of sustainable fashion and make a real impact on the environment{'\n'}</Text>
            <View style={{ flexDirection:"row" }}> 
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
            </View>
        </View>
    );

}
