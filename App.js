import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator();

import { Login } from './screens/Auth/index'
import Home from './screens/Home/Home';
import Chat from './screens/Chat/Chat';

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={"login"}>
      <Stack.Screen name="home" options={{
        headerShown:false,
      }} component={Home}/>

      <Stack.Screen name="chat" options={{
        headerShown:false,
      }} component={Chat}/>

      <Stack.Screen name="login" options={{
        headerShown:false,
      }} component={Login}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
