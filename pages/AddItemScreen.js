import { NavigationContainer, CommonActions } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button, Alert, Pressable, Image} from "react-native";
import { getAuth } from "firebase/auth";
import React from "react";
import * as ImagePicker from 'expo-image-picker';
import 'firebase/compat/storage';
import { getStorage, ref, uploadBytes} from "firebase/storage";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { TextInput } from "react-native-paper";

// style
import { styles } from '../DefinedStyles';
import { colors } from "../Colors";
import { ScrollView } from "react-native-gesture-handler";

export default function AddItemScreen({ navigation }) {
  const [itemColor, setItemColor] = React.useState('');
  const [itemSize, setItemSize] = React.useState('');
  const [itemType, setItemType] = React.useState('');
  // const [itemTypeOpen, setItemTypeOpen] = React.useState(false);
  // const [itemTypeValue, setItemTypeValue] = React.useState(null);
  // const [itemType, setItemType] = React.useState([
  //   {label: 'Shirt', value: 'Shirt'},
  //   {label: 'Pants', value: 'Pants'},
  //   {label: 'Dress', value: 'Dress'},
  //   {label: 'Skirt', value: 'Skirt'},
  //   {label: 'Jeans', value: 'Jeans'},
  //   {label: 'Jacket', value: 'Jacket'},
  //   {label: 'Sweater', value: 'Sweater'},
  //   {label: 'Blouse', value: 'Blouse'},	
  //   {label: 'Coat', value: 'Coat'},
  //   {label: 'Jumpsuit', value: 'Jumpsuit'},
  //   {label: 'Shorts', value: 'Shorts'},
  //   {label: 'Sweatshirt', value: 'Sweatshirt'},
  //   {label: 'T-Shirt', value: 'T-Shirt'},
  //   {label: 'Socks', value: 'Socks'},
  //   {label: 'Tie', value: 'Tie'},
  //   {label: 'Hat', value: 'Hat'},
  //   {label: 'Accessory', value: 'Accessory'},
  //   {label: 'Shoes', value: 'Shoes'},
  //   {label: 'Other', value: 'Other'},
  // ]);
  const [image, setImage] = React.useState(null);
  
  // + add user id to the database => auth.currentUser.uid
  const auth = getAuth();
  const user_uid = auth.currentUser.uid;
  let filename = "";

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.6,   // 0 means compress for small size, 1 means compress for maximum quality
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

  const handleAddItem = async () => {
    const db = getFirestore();
    await uploadImage();
    try {
      const docRef = await addDoc(collection(db, "items"), {
        itemColor: itemColor,
        itemSize: itemSize,
        itemType: itemType,
        userID: user_uid,
        itemPicture: filename,
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // navigation.navigate();
    navigation.dispatch(
      CommonActions.reset({
          index: 0,
          routes: [
              {
                  name: "My items",
              }
          ]
      })
  )
  }

  const uploadImage = async () => {
    const storage = getStorage();
    const uri = image;
    filename = uri.substring(uri.lastIndexOf('/') + 1);
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

};

    return (
      <ScrollView>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 25}}>
            <Text style={styles.paragraph}>Please add information about your clothing item that you want to trade.</Text>
            <View style={{paddingTop: 15}}>
              <Text style={{fontWeight: 'bold'}}>Item color</Text>
              <TextInput
              onChangeText={(text) => setItemColor(text)} placeholder="red"
              mode="outlined"
              style={styles.textInput}
              activeOutlineColor={colors.app_evergreen_brighter}/>
            </View>
            <View  style={{paddingTop: 15}}>
              <Text style={{fontWeight: 'bold'}}>Item size</Text>
              <TextInput
              onChangeText={(text) => setItemSize(text)} placeholder="M"
              mode="outlined"
              style={styles.textInput}
              activeOutlineColor={colors.app_evergreen_brighter}/>
            </View>

            <View  style={{paddingTop: 15}}>
              <Text style={{fontWeight: 'bold'}}>Item type</Text>
              <TextInput
              onChangeText={(text) => setItemType(text)} placeholder="dress"
              mode="outlined"
              style={styles.textInput}
              activeOutlineColor={colors.app_evergreen_brighter}/>
            </View>
            <Text style={{fontWeight: 'bold', paddingTop: 25}}>Upload item picture</Text>
            <View style={styles.buttonView}>
              <Pressable 
                  style = {styles.PrimaryButtonBig} 
                  onPress={ pickImage}>
                  <Text style = {styles.ButtonText}>Browse gallery</Text>
              </Pressable>
            </View>
            {// there is quite a well-known bug with expo camera, so I will leave it as a comment for now
            // there is not much time for me to add the camera feature rn
            }
            {/* <Pressable 
                style = {styles.PrimaryButton} 
                onPress={ takePhoto }>
                <Text style = {styles.ButtonText}>Take a photo</Text>
            </Pressable> */}
            {showImage()}
            <View style={styles.buttonView}>
              <Pressable 
                  style = {styles.PrimaryButtonBig} 
                  onPress={ handleAddItem }>
                  <Text style = {styles.ButtonText}>Add item</Text>
              </Pressable>
            </View>
        </View>
      </ScrollView>
    );
  }