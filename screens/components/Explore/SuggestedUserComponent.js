import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native'
import { colors, openChat, optimizeHeight, optimizeWidth } from '../../../lib/helpers'
import * as Haptics from 'expo-haptics';
import PrimaryButton from '../helpers/PrimaryButton';
import default_pp from '../../../assets/base64/default_pp';
import {useNavigation} from '@react-navigation/native'

const SuggestedUserComponent = ({ data }) => {
  const navigation = useNavigation();
  const [friends, setFriends] = useState(data?.friends);
  const [asked, setAsked] = useState(data?.asked);

  const handleSeeProfile = ()=>{
    Alert.alert(data?.name)
  }

  const handleRequest = ()=>{
    if(!friends){
      setAsked(prev=>!prev);
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      )
      return;
    }
    handleMessage();
  }

  const handleMessage = ()=>{
    openChat(data?.tag, navigation);
  }

  return (
    <TouchableWithoutFeedback onPress={handleSeeProfile}>
      <View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        paddingHorizontal:optimizeWidth(20),
        paddingVertical:optimizeHeight(20),
        width:optimizeWidth(180),
      }}>

          <Image source={{uri:data?.pp ? data?.pp : default_pp}} style={{
            width:optimizeWidth(100),
            height:optimizeWidth(100),
            borderRadius:999
          }} />

          <Text style={{
            color:colors.WHITE,
            marginTop:optimizeHeight(5),
            fontSize:optimizeWidth(15),
            textAlign:'center',
          }}>{data?.name}</Text>

        <TouchableOpacity onPress={handleSeeProfile}>
          <Text style={{
            color:colors.PRIMARY_TEXT,
            marginTop:optimizeHeight(2),
            fontSize:optimizeWidth(13),
            textAlign:'center',
          }}>{data?.tag ? data?.tag : "@"}</Text>
        </TouchableOpacity>

        <PrimaryButton type={
          !friends ?
            asked ? 
              "dark": 
            null:
          "dark"
        }
          moreStyle={{
            borderRadius:optimizeWidth(10),
            width:"100%",
            height:optimizeHeight(30),
            marginTop:optimizeHeight(11),
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            paddingVertical:0,
            paddingHorizontal:0
          }}
          textMoreStyle={{
            fontSize:optimizeWidth(15),
          }}
          text={
            !friends ?
              asked ? 
                "Requested": 
              "Add Friend":
            "Message"
          }
          onPress={handleRequest}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default SuggestedUserComponent;