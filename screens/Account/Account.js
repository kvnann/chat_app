import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from 'react-native'
import { styles } from '../assets'
import { optimizeHeight, optimizeWidth, colors, createDataURI } from '../../lib/helpers'
import { PrimaryLink, SuggestedUserComponents, PrimaryButton, GroupComponents } from '../components'
import { getSavedUserData, getSavedSettingsComponentsData, getUserDataAsync } from '../../lib/handlers'
import default_pp from '../../assets/base64/default_pp'
import default_bi from '../../assets/base64/default_bi'

const Account = () => {

  const [userData, setUserData] = useState(null);
  let authCompleted = false;

  const getSavedUserDataAsync = async()=>{
    if(authCompleted){
      return true;
    }
    const savedData = await getUserDataAsync();
    if(!savedData){
      return false;
    }
    setUserData({...savedData});
    authCompleted = true;
  }

  useEffect(() => {
    getSavedUserDataAsync();
  }, [])

  const handleEdit = ()=>{
    console.log("Edit triggered");
  } 

  const [savedUserData, setSavedUserData] = useState(null);

  useEffect(()=>{
    const getUser = getSavedUserData();
    setSavedUserData(getUser);
  },[savedUserData]);

  const [settingsComponentsData, setSettingsComponentsData] = useState(null);

  useEffect(()=>{
    const savedSettingsComponentsData = getSavedSettingsComponentsData();
    setSettingsComponentsData(savedSettingsComponentsData);
  },[savedUserData]);

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
            {savedUserData?.backgroundImage ? 
              <Image source={{
                uri:userData?.backgroundImage ? createDataURI(userData.backgroundImage) : default_bi
              }} style={{
                width:"100%",
                height:optimizeHeight(235),
                borderRadius:optimizeWidth(20),
                zIndex:-1,
              }}/> :
              <View style={{
                width:"100%",
                height:optimizeHeight(235),
                borderRadius:optimizeWidth(20),
                zIndex:-1,
                backgroundColor:colors.PRIMARY_LIGHT
              }}/>
          }
          </View>

          <View style={{
            display:'flex',
            alignItems:'center',
            width:"100%",
            transform:[{translateY:optimizeHeight(-100)}],
            
          }}>
            <Image source={{
              uri: createDataURI(userData?.pp ? userData.pp : default_pp)
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