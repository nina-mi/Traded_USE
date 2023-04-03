import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Pressable, FlatList} from "react-native";
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
  React.useEffect(() => {
    getSignedInUserItems();
  }, []);
  React.useEffect(() => {
    display();
  }, [userItemsRefresh]);

  async function getSignedInUserItems() {
    const q = query(collection(db, "items"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      if (data.userID === user.uid) {
        setUserItems(userItems => [...userItems, data])
      }
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
  }

  function display() {
    return (
      <FlatList
      data={userItemsRefresh}
      renderItem={({item}) => <Item itemType={item.itemType} itemSize={item.itemSize} itemColor={item.itemColor} />}
      keyExtractor={item => item.id}
    />
    )
  }

  // const DATA = [
  //   {
  //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //     type: 'Top',
  //     size: 'S',
  //     color: 'Red',
  //   },
  //   {
  //     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  //     type: 'Dress',
  //     size: 'M',
  //     color: 'Blue',
  //   },
  //   {
  //     id: '58694a0f-3da1-471f-bd96-145571e29d72',
  //     type: 'Skirt',
  //     size: 'L',
  //     color: 'Green',
  //   },
  // ];
  
  const Item = ({itemType, itemSize, itemColor}) => (
    <View style={styles.item}>
      <Text>{itemType + ", "+ itemColor+", "+ itemSize}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {display()}
      <Pressable 
        style = {styles.PrimaryButton} 
        onPress={() => navigation.navigate('Add item')}>
        <Text style = {styles.ButtonText}>Add item</Text>
      </Pressable>


    </View>

  );
}