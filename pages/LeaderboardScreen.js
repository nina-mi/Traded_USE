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
  let data_array = [];
  const [userPoints, setUserPoints] = React.useState(55);
  const [userInfoID, setUserInfoID] = React.useState("");
  const [peopleNames, setPeopleNames] = React.useState([]);
  const [peoplePoints, setPeoplePoints] = React.useState([]);
  const db = getFirestore();
  React.useEffect(() => {
    getSignedInUserPoints()
  }, [])
  
  React.useEffect(() => {
    getUserPoints()
  }, [])
  
  const data_array2 = [];


  async function getSignedInUserPoints() {
    const q = query(collection(db, "userInformation"));
    const querySnapshot = await getDocs(q);
    let i = 0;
    querySnapshot.forEach((doc) => {

      const data = doc.data();
      if (data.userID === user.uid) {
        setUserPoints(data.nrOfPoints);
        setUserInfoID(data.id);
        }
    });
  }

  async function getUserPoints() {
    const q = query(collection(db, "userInformation"), orderBy("nrOfPoints", "desc"), limit(5));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data_array.push(data);
      // console.log(data.displayName, " => ", data.nrOfPoints);
      setPeopleNames(peopleNames => [...peopleNames, data.displayName]);
      setPeoplePoints(peoplePoints => [...peoplePoints, data.nrOfPoints]);
      //displayNamePoints(data);
    });
  }


  async function checkIn() {
    console.log("got here");
    const userInformationRef = doc(collection(db, "userInformation"), userInfoID);
    const docSnap = await getDoc(userInformationRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    }
    await userInformationRef.update({
      nrOfPoints: FieldValue.increment(1)
    });
    console.log("Checked in!");
    getSignedInUserPoints();
    
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Complete your daily check-in!</Text>
      <Text>You can earn points by completing your daily check-in, successfully trading clothes with other users and reaching certain milestones.</Text>
      <Text>Keep track of your trades and watch your point balance grow as you continue to engage with our community!</Text>
      <Text>Your points: {userPoints}</Text>
      <Pressable 
        style = {styles.PrimaryButton} 
        onPress={ checkIn }>
        <Text style = {styles.ButtonText}>Check in!</Text>
      </Pressable>

      {/* <FlatList data={data_array} renderItem={({item}) => <Text>{item.name}</Text>}/> */}
      <Text>All users are ranked based on the number of points they've earned. So, stay active on the app to be on top of the leaderboard and be a leader in sustainable fashion.</Text>
      <View>
        <Text>Rank 1-5: Username, number of points</Text>
        <Text>1. {peopleNames[0]} - {peoplePoints[0]}</Text>
        <Text>2. {peopleNames[1]} - {peoplePoints[1]}</Text>
        <Text>3. {peopleNames[2]} - {peoplePoints[2]}</Text>
        <Text>4. {peopleNames[3]} - {peoplePoints[3]}</Text>
        <Text>5. {peopleNames[4]} - {peoplePoints[4]}</Text>
      </View>      

    </View>
  );
}