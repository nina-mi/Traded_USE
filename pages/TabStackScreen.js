import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LeaderboardScreen from './LeaderboardScreen';
import BrowseScreen from './BrowseScreen';
import MyMatchesScreen from './MyMatchesScreen';
import { ItemsStackScreen } from "./ItemsStackScreen";

const Tab = createBottomTabNavigator();

export default function TabStackScreen() {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Leaderboard" component={LeaderboardScreen}/>
    <Tab.Screen name="Browse" component={BrowseScreen}/>
    <Tab.Screen name="My matches" component={MyMatchesScreen}/>
    <Tab.Screen name="My items" component={ItemsStackScreen} options={{headerShown: false}} />
  </Tab.Navigator>
  );
}
