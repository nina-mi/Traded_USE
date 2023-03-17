import { NavigationContainer, CommonActions } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, TextInput, Button, Alert, Pressable, Image} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.config";
import React from "react";
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

// style
import { styles } from '../DefinedStyles';

export default function AddItemScreen({ navigation }) {
  const [itemColor, setItemColor] = React.useState('');
  const [itemSize, setItemSize] = React.useState('');
  const [itemType, setItemType] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  // + add user id to the database => auth.currentUser.uid
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,   // 0 means compress for small size, 1 means compress for maximum quality
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
    });

    console.log(result);

    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }
  };


  const showImage = () => {
    if (image == null) {
      return <Image
        source={require('../assets/images/woocommerce-placeholder.png')}
        transition={1000} style={{ width: 3*50, height: 4*50 }}
      />
    }
      //<Image source={{ uri: '../assets/images/fast_fashion.jpeg' }} style={{ width: 3*50, height: 4*50 }} />}
    else {
      return <Image source={{ uri: image }} style={{ width: 3*50, height: 4*50 }} />
    }
  };

  const handleAddItem = () => {
  }

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    })
    const ref = firebase.storage().ref().child(`Pictures/Image1`)
    const snapshot = ref.put(blob)
    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        setUploading(true)
      },
      (error) => {
        setUploading(false)
        console.log(error)
        blob.close()
        return 
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false)
          console.log("Download URL: ", url)
          setImage(url)
          blob.close()
          return url
        })
      }
      )
  }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Please add information about your clothing item that you want to trade.</Text>
            <View>
              <Text>Item color</Text>
              <TextInput label={"Item color"} onChangeText={(text) => setItemColor(text)} placeholder="red"/>
            </View>
            <View>
              <Text>Item size</Text>
              <TextInput label={"Item size"} onChangeText={(text) => setItemSize(text)} placeholder="M"/>
            </View>
            <View>
              <Text>Item type</Text>
              <TextInput label={"Item type"} onChangeText={(text) => setItemType(text)} placeholder="dress"/>
            </View>
            <Text>Upload item picture</Text>
            <Pressable 
                style = {styles.PrimaryButton} 
                onPress={ pickImage}>
                <Text style = {styles.ButtonText}>Browse gallery</Text>
            </Pressable>
            <Pressable 
                style = {styles.PrimaryButton} 
                onPress={ takePhoto }>
                <Text style = {styles.ButtonText}>Take a photo</Text>
            </Pressable>
            {showImage()}
            <Pressable 
                style = {styles.PrimaryButton} 
                onPress={ handleAddItem }>
                <Text style = {styles.ButtonText}>Add item</Text>
            </Pressable>
            {!uploading ? <Button title='Upload Image' onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}
        </View>
    );
  }