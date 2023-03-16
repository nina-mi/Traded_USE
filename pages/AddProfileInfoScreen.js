import { NavigationContainer, CommonActions } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, TextInput, Button, Alert} from "react-native";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import React from "react";

// style
import { styles } from '../DefinedStyles';

export default function AddProfileInfoScreen({ navigation }) {
    const auth = getAuth();
    const [username, setUsername] = React.useState('');

    const addProfileInfo = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                updateProfile(user, {
                    displayName: username,
                });
            }
        })
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Welcome',
                    }
                ]
            })
        )
        // .then(() => {
        //   navigation.dispatch(
        //     CommonActions.reset({
        //         index: 0,
        //         routes: [
        //             {
        //                 name: 'Welcome',
        //             },
                
        //         ],
        //     })
        //   )
        // })
        // .catch(error => {
        //   console.log(error);
        //   Alert.alert(error.message);
        // })
      }


      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Just one last step</Text>
            <Text>Personalize your profile by adding a username and a profile photo!</Text>
            <View>
              <Text>Username</Text>
              <TextInput onChangeText={(text) => setUsername(text)} placeholder="username123"/>
            </View>
            <Button
                title="Save my data"
                onPress={addProfileInfo
                    
                    
                }
            />
        </View>
    );
}