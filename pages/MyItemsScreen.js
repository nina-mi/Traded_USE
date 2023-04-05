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

export default function MyItemsScreen({navigation}) {
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

  

  // React.useEffect(() => {
  //   display();
  // }, [userItemsRefresh]);

  async function getSignedInUserItems() {
    console.log("called this function");
    const q = query(collection(db, "items"), where("userID", "==", user.uid));
    const querySnapshot = await getDocs(q);
    setUserItems([]);
    setUserItemsRefresh([]);
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
    //Call the Service to get the latest data
    getSignedInUserItems();
  };
  
  const Item = ({itemType, itemSize, itemColor, image}) => (
    <View style={styles.item}>
      { itemType=== "No items yet." ?       
        <Text style={styles.itemText}>
        <Image source={require('../assets/images/woocommerce-placeholder.png')} 
        style={{ width: 3*30, height: 4*30 }} />
      {"     "+itemType + "\n\n\n"}</Text> :
         <Text style={styles.itemText}>
        <Image source={{ uri: image }}
        style={{ width: 3*30, height: 4*30 }} />
 
      {"     "+itemType + ", "+ itemColor+", "+ itemSize + "\n\n\n"}</Text>}


    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <Pressable 
          style = {styles.PrimaryButtonBig} 
          onPress={() => navigation.navigate('Add item')}>
          <Text style = {styles.ButtonText}>Add item</Text>
        </Pressable>
      </View>
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