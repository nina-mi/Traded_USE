import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyItemsScreen from './MyItemsScreen';
import AddItemScreen from './AddItemScreen';


const ItemsStack = createNativeStackNavigator();

export function ItemsStackScreen() {
  return (
    <ItemsStack.Navigator initialRouteName="My items">
      <ItemsStack.Screen name="My items" component={MyItemsScreen} />
      <ItemsStack.Screen name="Add item" component={AddItemScreen} />
    </ItemsStack.Navigator>
  );
}