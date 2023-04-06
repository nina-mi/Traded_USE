import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Image, Pressable, FlatList, RefreshControl, ActivityIndicator} from "react-native";
import Button from '../components/Button';
import { getAuth } from "firebase/auth";
import React from "react";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL} from "firebase/storage";
import { collection, query, where, doc, getDoc, getDocs, orderBy, limit, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { LogBox } from 'react-native';

// style
import { styles } from '../DefinedStyles';


export default function BrowseScreen({ navigation }) {
  LogBox.ignoreLogs(['Warning: ...']);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();
  const [userItems, setUserItems] = React.useState([{itemType: "No items yet.", itemSize: "", itemColor: ""}]);
  const [userItemsRefresh, setUserItemsRefresh] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(true);
  const storage = getStorage();

  React.useEffect(() => {
    getSignedInUserItems();
  }, []);

  async function getSignedInUserItems() {
    console.log("called this function");
    const q = query(collection(db, "items"), where("userID", "!=", user.uid));
    const querySnapshot = await getDocs(q);
    setUserItems([]);
    await querySnapshot.forEach((doc) => {
      let data = doc.data();
      console.log(data.itemPicture);
      let imageRef = ref(storage, data.itemPicture);
      getDownloadURL(imageRef).then((url) => {
        data.image = url;
        console.log(url);
      });
      setUserItems(userItems => [...userItems, data]);
    });
    if ( userItems.length == 0) {
      setUserItems([{itemType: "No items yet.", itemSize: " ", itemColor: " "}]);
    } else {
    }
    setUserItemsRefresh( userItems.map((item, index) => {
        return {
          ...item,
          id: index + 1
        };
      })

    );

    console.log("previous array");
    console.log(userItems);
    console.log("updated in react array");
    console.log(userItemsRefresh);
    setRefreshing(false);
    console.log("refreshing set to false");
  }

  const onRefresh = () => {
    //Clear old data of the list
    setUserItems([]);
    setUserItemsRefresh([]);
    //Call the Service to get the latest data
    getSignedInUserItems();
  };

  const Item = ({itemType, itemSize, itemColor, image}) => (
    <View style={styles.browseItem}>
      { itemType=== "No items yet." ?
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.browseItemText}>No items yet.</Text>
          <Image source={require('../assets/images/woocommerce-placeholder.png')} 
          style={{ width: 3*90, height:  4*90, alignSelf: 'center'}} />
        </View>
        : 
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.browseItemText}>{itemType}, {itemColor}, {itemSize}</Text>
          <Image source={{uri: image}} 
            style={{ width: 3*90, height: 4*90, alignSelf: 'center', marginBottom: 15}} />

          <View style={{ flexDirection:"row", justifyContent: "space-between"}}>
            <Pressable 
              style = {styles.PrimaryButton} 
              onPress={() => {}}>
              <Text style = {styles.ButtonText}>Hate it</Text>
            </Pressable>

            <Pressable 
              style = {styles.PrimaryButton} 
              onPress={() => {}}>
              <Text style = {styles.ButtonText}>Love it</Text>
            </Pressable>
          </View>

        </View>
      } 

    </View>
  );


  return (
    <View style={styles.containerBrowse}>
    {refreshing ? <ActivityIndicator /> : null}
    { refreshing ? null :       <FlatList
      data={userItemsRefresh}
      renderItem={({item}) => <Item itemType={item.itemType} itemSize={item.itemSize} itemColor={item.itemColor} image={item.image} />}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl
          //refresh control used for the Pull to Refresh
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />}




  </View>
  );
}