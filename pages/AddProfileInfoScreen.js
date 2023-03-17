import { NavigationContainer, CommonActions } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, TextInput, Button, Alert, Pressable, Image} from "react-native";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import React from "react";
import * as ImagePicker from 'expo-image-picker';

// style
import { styles } from '../DefinedStyles';

export default function AddProfileInfoScreen({ navigation }) {
    const auth = getAuth();
    const [username, setUsername] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,   // 0 means compress for small size, 1 means compress for maximum quality
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
    
    const showImage = () => {
        if (image == null) {
          return <Image
            source={require('../assets/images/woocommerce-placeholder_square.png')}
            transition={1000} style={{ width: 3*50, height: 3*50 }}
          />
        }
        else {
          return <Image source={{ uri: image }} style={{ width: 3*50, height: 3*50 }} />
        }
      };

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
            <Text>Upload a profile picture</Text>
            <Pressable 
                style = {styles.PrimaryButton} 
                onPress={ pickImage}>
                <Text style = {styles.ButtonText}>Browse gallery</Text>
            </Pressable>
            {showImage()}
            <Pressable 
                style = {styles.PrimaryButton} 
                onPress={ addProfileInfo }>
                <Text style = {styles.ButtonText}>Save my data</Text>
            </Pressable>
        </View>
    );
}