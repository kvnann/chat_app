import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator();

import { Login, Register } from './screens/Auth/index'
import Home from './screens/Home/Home';
import Chat from './screens/Chat/Chat';
import { SplashScreen } from './screens';
import { useEffect, useState } from 'react';
import { getAccessToken, getLoadedChats, saveLoadedChats } from './lib/handlers/storage.handlers';
import { getAuthAsync } from './lib/handlers/auth.handlers';

export default function App() {
  const [authenticated, setAuthenticated] = useState(null);
  let authStarted = false;

  const authFunctionAsync = async()=>{
    if(authStarted){
      return;
    }
    authStarted = true;
    getAuthAsync((err,response)=>{
      if(err){
        setAuthenticated(false);
        console.log(err)
        return;
      }
      setAuthenticated(true);
      return;
    })
  }

  useEffect(()=>{
    authFunctionAsync();
  },[])
  return (
    authenticated !== null && typeof(authenticated) === 'boolean'?
  <NavigationContainer>
    <Stack.Navigator initialRouteName={authenticated?"home":"login"}>
      <Stack.Screen name="home" options={{
        headerShown:false,
      }} component={Home}/>

      <Stack.Screen name="chat" options={{
        headerShown:false,
      }} component={Chat}/>

      <Stack.Screen name="login" options={{
        headerShown:false,
      }} component={Login}/>

      <Stack.Screen name="register" options={{
        headerShown:false,
      }} component={Register}/>

    </Stack.Navigator>
  </NavigationContainer> : <SplashScreen/>
  );
}
