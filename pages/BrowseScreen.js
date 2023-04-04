import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Image} from "react-native";
import Button from '../components/Button';
import { getAuth } from "firebase/auth";
import React from "react";
import { getStorage, ref, getDownloadURL} from "firebase/storage";


// style
import { styles } from '../DefinedStyles';
import { useEffect } from "react";

export default function BrowseScreen({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const [image, setImage] = React.useState(null);

  useEffect(() => {
    const storage = getStorage();
    let imageRef = ref(storage, 'magnolia.jpg');
    getDownloadURL(imageRef)
    .then((url) => {
        setImage(url);
        console.log(url);
      })
      .catch((e) => console.log('getting downloadURL of image error => ', e));
    console.log(image);
  }, [])

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



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Browse</Text>
        {showImage()}
    </View>
  );
}