import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import ListsScreen from './src/screens/ListsScreen';
import ListDetailScreen from './src/screens/ListDetailScreen';
import AddItemScreen from './src/screens/AddItemScreen';

export type RootStackParamList = {
  Lists: undefined;
  ListDetail: { listId: string };
  AddItem: { listId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator>
        <Stack.Screen name="Lists" component={ListsScreen} options={{ title: 'Shop Lists' }} />
        <Stack.Screen name="ListDetail" component={ListDetailScreen} options={{ title: 'List' }} />
        <Stack.Screen name="AddItem" component={AddItemScreen} options={{ title: 'Add Item' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
