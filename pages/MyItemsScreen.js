import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Pressable, FlatList, RefreshControl, ActivityIndicator, Image} from "react-native";
import Button from '../components/Button';
import React from "react";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, doc, getDoc, getDocs, orderBy, limit, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL} from "firebase/storage";

// style
import { styles } from '../DefinedStyles';

export default function MyItemsScreen({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();
  const [userItems, setUserItems] = React.useState([{itemType: "Your items will appear here", itemSize: " with their photo, type, size ", itemColor: " and color"}]);
  const [userItemsRefresh, setUserItemsRefresh] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(true);
  const storage = getStorage();

  React.useEffect(() => {
    getSignedInUserItems();
  }, []);

  // React.useEffect(() => {
  //   display();
  // }, [userItemsRefresh]);

  async function getSignedInUserItems() {
    console.log("called this function");
    const q = query(collection(db, "items"), where("userID", "==", user.uid));
    const querySnapshot = await getDocs(q);
    await querySnapshot.forEach((doc) => {
      let data = doc.data();
      const imageURL = getDownloadURL(ref(storage, data.itemPicture));
      data.image = imageURL;
      console.log(imageURL);
      setUserItems(userItems => [...userItems, data]);
    });
    if ( userItems.length == 0) {
      setUserItems([{itemType: "Your items will appear here", itemSize: " with their photo, type, size ", itemColor: " and color"}]);
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
    <View style={styles.item}>
      <Image source={require('../assets/images/woocommerce-placeholder.png')} style={{ width: 3*20, height: 4*20 }} />
      <Text style={styles.itemText}>{itemType + ", "+ itemColor+", "+ itemSize}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable 
        style = {styles.PrimaryButton} 
        onPress={() => navigation.navigate('Add item')}>
        <Text style = {styles.ButtonText}>Add item</Text>
      </Pressable>
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