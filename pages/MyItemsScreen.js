import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Pressable, FlatList, RefreshControl, ActivityIndicator} from "react-native";
import Button from '../components/Button';
import React from "react";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, doc, getDoc, getDocs, orderBy, limit, updateDoc } from "firebase/firestore";


// style
import { styles } from '../DefinedStyles';

export default function MyItemsScreen({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();
  const [userItems, setUserItems] = React.useState([]);
  const [userItemsRefresh, setUserItemsRefresh] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(true);

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
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      setUserItems(userItems => [...userItems, data])
    });
    setUserItemsRefresh( userItems.map((item, index) => {
        return {
          ...item,
          id: index + 1
        };
      })
    );
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
  
  const Item = ({itemType, itemSize, itemColor}) => (
    <View style={styles.item}>
      <Text>{itemType + ", "+ itemColor+", "+ itemSize}</Text>
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
        renderItem={({item}) => <Item itemType={item.itemType} itemSize={item.itemSize} itemColor={item.itemColor} />}
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