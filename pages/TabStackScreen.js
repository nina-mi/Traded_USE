import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LeaderboardScreen from './LeaderboardScreen';
import BrowseScreen from './BrowseScreen';
import MyMatchesScreen from './MyMatchesScreen';
import { ItemsStackScreen } from "./ItemsStackScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native';

// style
import { colors } from "../Colors";

const Tab = createBottomTabNavigator();

export default function TabStackScreen() {
  LogBox.ignoreLogs(['Warning: ...']);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Leaderboard') {
            iconName = 'ios-list';
          } else if (route.name === 'Browse') {
            iconName = 'compass-outline';
          } else if (route.name === 'My matches') {
            iconName = 'bookmark-outline'
          } else if (route.name === 'My item') {
            iconName = 'create-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.app_evergreen,
        inactiveTintColor: colors.app_evergreen_brighter,
      }}>
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen}/>
      <Tab.Screen name="Browse" component={BrowseScreen}/>
      <Tab.Screen name="My matches" component={MyMatchesScreen}/>
      <Tab.Screen name="My item" component={ItemsStackScreen} options={{headerShown: false, title: 'My items' }} />
    </Tab.Navigator>
  );
}
