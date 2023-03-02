import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text} from "react-native";
import Button from '../components/Button';
import { getAuth } from "firebase/auth";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LeaderboardScreen from './LeaderboardScreen';
import BrowseScreen from './BrowseScreen';
import MyItemsScreen from './MyItemsScreen';
import MyMatchesScreen from './MyMatchesScreen';

const Tab = createBottomTabNavigator();

export default function TabStackScreen() {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Leaderboard" component={LeaderboardScreen}/>
    <Tab.Screen name="Browse" component={BrowseScreen}/>
    <Tab.Screen name="My matches" component={MyMatchesScreen}/>
    <Tab.Screen name="My items" component={MyItemsScreen}/>
  </Tab.Navigator>
  );
}
