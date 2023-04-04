import { StyleSheet, View, Text, Pressable, ScrollView} from "react-native";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { collection, query, where, doc, getDoc, getDocs, orderBy, limit, updateDoc, FieldValue} from "firebase/firestore";
import React from "react";
//import { Table, Row, Rows, Col, TableWrapper} from "react-native-table-component";
//import Leaderboard from 'react-native-leaderboard';
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
  const [userPoints, setUserPoints] = React.useState(6);
  const [userInfoID, setUserInfoID] = React.useState("");
  const [peopleNames, setPeopleNames] = React.useState([]);
  const [peoplePoints, setPeoplePoints] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const db = getFirestore();

  React.useEffect(() => {
    getSignedInUserPoints()
  }, []);
  
  React.useEffect(() => {
    getUserPoints()
  }, []);
  
  const CONTENT = {
    tableHead: ['Rank', 'Username', 'Points'],
  tableTitle: ['1', '2', '3', '4', '5'],
  tableData: [
    [peopleNames[0], peoplePoints[0]],
    [peopleNames[1], peoplePoints[1]],
    [peopleNames[2], peoplePoints[2]],
    [peopleNames[3], peoplePoints[3]],
    [peopleNames[4], peoplePoints[4]],
  ],
  };


  async function getSignedInUserPoints() {
    const q = query(collection(db, "userInformation"), where("userID", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const data = doc.data();
      if (data.userID === user.uid && setPeoplePoints != data.nrOfPoints) {
        setUserPoints(data.nrOfPoints);
        setUserInfoID(doc.id);
        }
    });
  }

  async function getUserPoints() {
    const q = query(collection(db, "userInformation"), orderBy("nrOfPoints", "desc"), limit(5));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // console.log(data.displayName, " => ", data.nrOfPoints);
      setPeopleNames(peopleNames => [...peopleNames, data.displayName]);
      setPeoplePoints(peoplePoints => [...peoplePoints, data.nrOfPoints]);
      //displayNamePoints(data);
    });
  }


  async function checkIn() {
    console.log("got here");
    const userInformationRef = query(collection(db, "userInformation"), where("userID", "==", user.uid));
    // const userInformationRef = doc(collection(db, "userInformation"), userInfoID);
    const docSnap = await getDocs(userInformationRef);

    docSnap.forEach((doc) => {
      const docRef = doc(db, collection(db, "userInformation"), userInfoID);
      docRef.update({
        "nrOfPoints": (peoplePoints + 1)
        }
      );
    });

    // await userInformationRef.update({
    //   "nrOfPoints": (peoplePoints + 1)
    // });    
    // await userInformationRef.update(
    //   "nrOfPoints", FieldValue.increment(1)
    // );

    console.log("Checked in!");
    getSignedInUserPoints();
    
  }

  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      

      <View style={{ flex: 0.6, alignItems: 'center'}}>

        <Text style = {styles.title}>{'\n'}Leaderboard: Rank 1-5</Text>
        <Text style = {styles.textlb}>1. {peopleNames[0]} - {peoplePoints[0]}</Text>
        <Text style = {styles.textlb}>2. {peopleNames[1]} - {peoplePoints[1]}</Text>
        <Text style = {styles.textlb}>3. {peopleNames[2]} - {peoplePoints[2]}</Text>
        <Text style = {styles.textlb}>4. {peopleNames[3]} - {peoplePoints[3]}</Text>
        <Text style = {styles.textlb}>5. {peopleNames[4]} - {peoplePoints[4]}</Text>
        {/* <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={CONTENT.tableHead}
            flexArr={[1, 2, 1]}
            // style={styles.tableHead}
          />
          <TableWrapper style={styles.tableWrapper}>
            <Col
              data={CONTENT.tableTitle}
              // style={styles.tableTitle}
              heightArr={[28, 28]}
              // textStyle={styles.tableText}
            />
            <Rows
              data={CONTENT.tableData}
              flexArr={[2, 1]}
              style={styles.tableRow}
              // textStyle={styles.tableText}
            />
          </TableWrapper>
      </Table> */}
      </View>      
<ScrollView style={{borderBottomColor: 'black',
    borderWidth: StyleSheet.hairlineWidth, flex: 0.4}}>
      <Text style = {styles.title}>Complete your daily check-in!</Text>
      <Text>{'\n'}You can earn points by completing your daily check-in, successfully trading clothes with other users, or reaching certain milestones.</Text>
      <Text>{'\n'}All users are ranked based on the number of points they've earned. So, stay active on the app to be on top of the leaderboard and be a leader in sustainable fashion.</Text>
      <Text style={{fontWeight: 'bold'}}>{'\n'}Your points: {userPoints}{'\n'}</Text>
      <Pressable 
        style = {styles.PrimaryButton} 
        onPress={ checkIn }>
        <Text style = {styles.ButtonText}>Check in!</Text>
      </Pressable>

      {/* <FlatList data={data_array} renderItem={({item}) => <Text>{item.name}</Text>}/> */}
      
      </ScrollView>
    </View>
  );
}