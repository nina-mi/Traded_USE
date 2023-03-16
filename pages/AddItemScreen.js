import { NavigationContainer, CommonActions } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, TextInput, Button, Alert} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.config";
import React from "react";

// style
import { styles } from '../DefinedStyles';

export default function AddItemScreen({ navigation }) {
  const [itemColor, setItemColor] = React.useState('');
  const [itemPicture, setItemPicture] = React.useState('');
  const [itemSize, setItemSize] = React.useState('');
  const [itemType, setItemType] = React.useState('');
  // + add user id to the database => auth.currentUser.uid

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleAddItem = () => {
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
            <Button
                title="Add item"
                onPress={ handleAddItem }
            />
        </View>
    );
  }