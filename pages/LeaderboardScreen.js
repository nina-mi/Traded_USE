import { StyleSheet, View, Text, Pressable} from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, doc, getDoc, getDocs, orderBy, limit, updateDoc } from "firebase/firestore";
import React from "react";

// style
import { styles } from '../DefinedStyles';

// function displayNamePoints(data) {
//   return (
//     <View>
//       <Text>{data.nrOfPoints}: {data.displayName}</Text>
//     </View>
//   );
// }

export default function LeaderboardScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  const data_array = [];
  const [userPoints, setUserPoints] = React.useState(55);
  const [userInfoID, setUserInfoID] = React.useState("");
  const db = getFirestore();
  getSignedInUserPoints();
  whatever();


  async function getSignedInUserPoints() {
    const q = query(collection(db, "userInformation"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.userID === user.uid) {
        setUserPoints(data.nrOfPoints);
        setUserInfoID(data.id);
        }
    });
  }

  const getUserPoints = async () => {
    const data_array = [];
    const q = query(collection(db, "userInformation"), orderBy("nrOfPoints", "desc"), limit(5));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      const data = doc.data();
      console.log(data.displayName, " => ", data.nrOfPoints);
      //displayNamePoints(data);
    });
  }

  // const displayNamePoints = (data) => {
  //   return (
  //     <View>
  //       <Text>{data.nrOfPoints}: {data.displayName}</Text>
  //     </View>
  //   );
  // }
  async function whatever() {
    console.log("whatever");
    const userInformationRef = doc(collection(db, "userInformation"), userInfoID);
    const docSnap = await getDoc(userInformationRef);
    console.log(docSnap.data());
  }

  async function checkIn() {
    //setUserPoints(userPoints + 1);
    //const userInformationRef = doc(db, "userInformation", userInfoID);
    //const userInformationRef = db.collection("userInformation").doc(userInfoID);
    //const docSnap = await getDoc(userInformationRef);
    const userInformationRef = doc(collection(db, "userInformation"), userInfoID);
    const docSnap = await getDoc(userInformationRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    }
    await userInformationRef.update({
      nrOfPoints: FieldValue.increment(1)
    });
    console.log("Checked in!");
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Your points: {userPoints}</Text>
      <Pressable 
        style = {styles.PrimaryButton} 
        onPress={ checkIn }>
        <Text style = {styles.ButtonText}>Check in!</Text>
      </Pressable>

      {/* {getUserPoints()} */}

    </View>
  );
}