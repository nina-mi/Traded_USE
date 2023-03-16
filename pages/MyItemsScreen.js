import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Pressable} from "react-native";
import Button from '../components/Button';
import { getAuth } from "firebase/auth";

// style
import { styles } from '../DefinedStyles';

export default function MyItemsScreen({ navigation }) {
  const auth = getAuth();
  user = auth.currentUser;
  // if (user) {
  // }
  return (
    <View style={styles.container}>
      <Pressable 
        style = {styles.PrimaryButton} 
        onPress={() => navigation.navigate('Add item')}>
        <Text style = {styles.ButtonText}>Add item</Text>
      </Pressable>
    </View>

  );
}