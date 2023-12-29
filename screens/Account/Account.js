import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from 'react-native'
import { styles } from '../assets'
import { optimizeHeight, optimizeWidth, colors, createDataURI } from '../../lib/helpers'
import { PrimaryLink, GroupComponents } from '../components'
import { getSavedSettingsComponentsData, getUserDataAsync } from '../../lib/handlers'
import default_pp from '../../assets/base64/default_pp'
import default_bi from '../../assets/base64/default_bi'
import { getAuthUser } from '../../lib/handlers/storage.handlers'
import { getUserPhotos } from '../../lib/handlers/chats.handlers'
import { getAuthAsync } from '../../lib/handlers/auth.handlers'

const Account = () => {

  const [userData, setUserData] = useState(null);
  let authStarted = false;

  const getSavedUserDataAsync = async()=>{
    const savedData = await getAuthUser();
    if(!savedData){
      return;
    }
    setUserData(savedData);
  }
  const loadNewUserData = async()=>{
    if(authStarted){
      return;
    }
    authStarted = true;
    await getAuthAsync((err,response)=>{
      if(err){
        console.log(err)
      }
      getUserPhotos(response.data?.username, async(err,res)=>{
        if(err){
          console.log(err)
          return; 
        }
        setUserData({...response.data, pp:res.data.pp, backgroundImage:res.data?.backgroundImage});
      });
    });
  }
  useEffect(() => {
    getSavedUserDataAsync();
    loadNewUserData();
  }, [])

  const handleEdit = ()=>{
    console.log("Edit triggered");
  } 

  const [settingsComponentsData, setSettingsComponentsData] = useState(null);

  useEffect(()=>{
    const savedSettingsComponentsData = getSavedSettingsComponentsData();
    setSettingsComponentsData(savedSettingsComponentsData);
  },[userData]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={[styles.main.container , {
        backgroundColor:colors.PRIMARY_DARK,
        flex:1,
        border:"none"
      }]}>

        <View style={{
          marginTop:optimizeHeight(20),
          paddingRight:optimizeWidth(10),
          width:"100%",
          alignItems:"flex-end",
          marginBottom:optimizeHeight(10)
        }}>
          <PrimaryLink text={"Edit"} onPress={handleEdit}/>
        </View>

        <ScrollView>

          <View style={[{
            marginTop:optimizeHeight(10),
          }]}>
              <Image source={{
                uri:createDataURI(userData?.backgroundImage ?? default_bi)
              }} style={{
                width:"100%",
                height:optimizeHeight(235),
                borderRadius:optimizeWidth(20),
                zIndex:-1,
              }}/>
          </View>

          <View style={{
            display:'flex',
            alignItems:'center',
            width:"100%",
            transform:[{translateY:optimizeHeight(-100)}],
            
          }}>
            <Image source={{
              uri: createDataURI(userData?.pp ?? default_pp)
            }} style={{
              width:optimizeHeight(150),
              height:optimizeHeight(150),
              borderRadius:999,
              zIndex:1
            }}
            />
          </View>

            <View style={{
              display:'flex',
              width:'100%',
              alignItems:'center',
              marginTop:optimizeHeight(-100)
            }}>
              <Text style={{
                color:colors.WHITE, 
                textAlign:'center',
                fontSize:optimizeWidth(27)
              }}>{userData?.firstName && userData?.lastName ? `${userData?.firstName} ${userData?.lastName}`:"Loading..."}</Text>

              <Text style={{
                color:colors.PRIMARY_TEXT, 
                textAlign:'center',
                fontSize:optimizeWidth(15)
              }}>{userData?.username ? `@${userData?.username}`:"Loading..."}</Text>

            </View>
            <View style={{
              marginBottom:optimizeHeight(30)
            }}>
              { settingsComponentsData?.length > 0 ? 
                settingsComponentsData.map(settingsComponentData => {
                  return <View key={settingsComponentsData.indexOf(settingsComponentData)} style={{
                    width:'100%',
                    display:'flex',
                    alignItems:'center',
                    marginTop:optimizeHeight(32),
                  }}>
                    <GroupComponents componentsData={settingsComponentData}/>
                  </View>
                }) : <View></View>
              }
            </View>

          </ScrollView>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Account