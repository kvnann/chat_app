import React, { useEffect, useRef, useState } from 'react'
import { Alert, StatusBar, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chats from '../Chats/Chats';
import { colors } from '../../lib/helpers';
import Explore from '../Explore/Explore';
import Account from '../Account/Account';
import { useNavigation } from '@react-navigation/native'

import { TabBarAnimationIcon } from './components/AnimationIcons';
import { getAuthAsync } from '../../lib/handlers/auth.handlers';
import { saveSavedUser } from '../../lib/handlers';
import { saveAuthUser } from '../../lib/handlers/storage.handlers';
import { getUserPhotos } from '../../lib/handlers/chats.handlers';

const Tab = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();

  let authCompleted=false;
  // const [userData, setUserData] = useState(null);

  // useState(()=>{
  //   setInterval(()=>{console.log("salam")},3*60*1000)
  // },[]);

  const setAuthFuncitonAsync = async()=>{
    if(authCompleted){
      return;
    }
    authCompleted = true;
    await getAuthAsync(async(err,response)=>{
      if(err){
        if(err?.response?.data){
          navigation.replace("login");
          return;
        }
        navigation.replace("login");
      }
      if(!response?.status === 200){
        navigation.replace("login");
        return;
      }
      getUserPhotos(response.data?.username, async(err,res)=>{
        if(err){
          console.log(err)
          return; 
        }
        // setUserData({...response.data, pp:res.data.pp, backgroundImage:res.data?.backgroundImage});
      });
      // setUserData(response.data);
      await saveAuthUser(response.data);
      return;
    });
  }
  useEffect(() => {
    setAuthFuncitonAsync();
  }, []);

  return (
    <>
    <StatusBar
    barStyle="light-content"
    />
    <Tab.Navigator screenOptions={({ route })=>({
        headerShown:false,
        tabBarStyle:{
            backgroundColor: colors.PRIMARY_LIGHT,
            borderTopColor:colors.PRIMARY_MUTED,
            borderTopWidth:0.5
        },
        tabBarIcon: ({ focused }) => {
            if (route.name === 'Explore') {
              
              if(focused){
                StatusBar.setBarStyle('light-content');
                Platform.OS === "android" && StatusBar.setBackgroundColor("black");
              }

              return focused ?
              <TabBarAnimationIcon source={require("../../assets/animations/search_filled.json")} size={35} positions={[0,100]}/>
              :<TabBarAnimationIcon source={require("../../assets/animations/search.json")} size={35} positions={[0,0]}/>

            } else if (route.name === 'Chats') {

              if(focused){
                StatusBar.setBarStyle('light-content');
                Platform.OS === "android" && StatusBar.setBackgroundColor("white");
              }

              return focused ?
              <TabBarAnimationIcon source={require("../../assets/animations/chat_filled.json")} size={65}  positions={[0,47]}/>
              :<TabBarAnimationIcon source={require("../../assets/animations/chat.json")} size={65}  positions={[47,47]}/>
              
              } else if(route.name === 'Account') {
                if(focused){
                  StatusBar.setBarStyle('light-content');
                  Platform.OS === "android" && StatusBar.setBackgroundColor("black");
                }

                return focused ?
                <TabBarAnimationIcon source={require("../../assets/animations/account_male_filled.json")} size={33} positions={[0,100]}/>
                :<TabBarAnimationIcon source={require("../../assets/animations/account_male.json")} size={33} positions={[0,0]}/>
            }
        },
        tabBarActiveTintColor: colors.PRIMARY_TEXT,
        tabBarInactiveTintColor: colors.MUTED,
    })}  initialRouteName="Chats">
        <Tab.Screen name="Explore" component={Explore}/>
        <Tab.Screen name="Chats" component={Chats}/>
        <Tab.Screen name="Account" component={Account}/>
    </Tab.Navigator>
    </>
  )
}

export default Home