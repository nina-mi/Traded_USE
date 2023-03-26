import { NavigationContainer, CommonActions } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, TextInput, Button, Alert, Pressable, Image, TouchableOpacity, Platform, Blob} from "react-native";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import React from "react";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

// style
import { styles } from '../DefinedStyles';


export default function AddProfileInfoScreen({ navigation }) {
    const auth = getAuth();
    const [username, setUsername] = React.useState('');
    const [image, setImage] = React.useState(null);

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

    const uploadImage = async () => {
        const storage = getStorage();
        const uri = image;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        const response = await fetch(uploadUri);
        const blobFile = await response.blob();
        const reference = ref(storage, filename);
        const task = uploadBytes(reference, blobFile);

        try {
            await task;
        } catch (e) {
            console.error(e);
        }
        await addProfileInfo(uploadUri);
    };

    const addProfileInfo = async (uri) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User displayname and uri:", username, uri);
                updateProfile(user, {
                    displayName: username,
                    photoURL: uri,
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
    }

    const addNewUserPoints = async () => {
        console.log("Adding new user points");
        user = auth.currentUser;
        const db = getFirestore();
        try {
          const docRef = await addDoc(collection(db, "userInformation"), {
            nrOfPoints: 0,
            userID: auth.currentUser.uid,
            displayName: username,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
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
            {/* <Pressable 
                style = {styles.PrimaryButton} 
                onPress={ addProfileInfo }>
                <Text style = {styles.ButtonText}>Save my data</Text>
            </Pressable> */}
            <TouchableOpacity style={styles.PrimaryButton} onPress={() => {uploadImage(); addNewUserPoints()}}>
                <Text style={styles.ButtonText}>Save my data</Text>
            </TouchableOpacity>
        </View>
    );
}