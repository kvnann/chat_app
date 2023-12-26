import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import { AllIcons, styles } from '../../assets'
import { optimizeHeight, optimizeWidth, colors, openChat, createDataURI, isYesterday, areSameDay, formatTime, getDatePreview } from '../../../lib/helpers'

import SeenIcon from '../../../assets/icons/seen_icon.svg'
import { useNavigation } from '@react-navigation/native'
import default_pp from '../../../assets/base64/default_pp'
import { getOneLoadedUser } from '../../../lib/handlers/storage'


const ChatComponent = ({ chatData, authUser }) => {
  const navigation = useNavigation();
  // const friendData = !chatData?.isGroup ? chatData?.participants.filter(p=>p!==authUser?.username)[0] : null;
  // const lastMessage = chatData?.messages[chatData?.messages.length-1]

  const [friendData, setFriendData] = useState(null);
  const [lastMessage, setLastMessage] = useState(chatData?.messages[chatData?.messages.length-1]);

  const fetchFriendData = async() => {
    if(!chatData?.isGroup){
      const friendUsername = !chatData?.isGroup ? JSON.parse(chatData.participants).filter(p=>p!==authUser?.username)[0] : null;
      if(!friendUsername){
        return;
      }
      const fetchedFriendData = await getOneLoadedUser(friendUsername);
      console.log(typeof(lastMessage?.timeSent) == 'string')
      setFriendData(fetchedFriendData);
    }
  }

  useEffect(() => {
    if(chatData){
      fetchFriendData();
      const lastMessageData = chatData.messages[chatData.messages.length-1]
      console.log(lastMessageData)
      setLastMessage(lastMessageData)
    }
  }, [])

  const handleChatPress = ()=>{
    // openChat(data?.tag, navigation);
    console.log("clicked me");
  }

  return (
    <View style={{
      display:"flex",
      flexDirection:"column"
    }}>
    <TouchableHighlight onPress={handleChatPress} >
      <View style={[styles.chats.chat]}>
        {
          lastMessage?.timeRead  === null && lastMessage.sentBy !== authUser.username ? 
          <View style={{
            width:optimizeWidth(12),
            height:optimizeWidth(12),
            backgroundColor:colors.PRIMARY_TEXT,
            borderRadius:999,
            marginHorizontal:optimizeWidth(8)
          }}></View>:
          typeof(lastMessage?.timeRead) === 'string' && lastMessage.sentBy === authUser.username ?
          <SeenIcon width={optimizeWidth(29)} color={colors.PRIMARY_TEXT}/> :
          typeof(lastMessage?.timeSent) === 'string' && lastMessage.sentBy === authUser.username ?
          <SeenIcon width={optimizeWidth(29)} color={colors.MUTED}/> :
          <View style={{width:optimizeWidth(28)}}></View>
        }

          <View>
            <Image source={{uri:createDataURI(default_pp)}} style={{
              width:optimizeWidth(50),
              height:optimizeWidth(50),
              borderRadius:999
            }}/>
          </View>

          <View style={{
              display:"flex",
              height:"100%",
              flexDirection:"row",
              justifyContent:"space-between",
              paddingLeft:optimizeWidth(15),
              width:"100%",
          }}>
            <View style={{
              display:"flex",
              flexDirection:"column",
              height:"100%",
              width:"100%",
            }}>
              <View style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between",
                width:"80%",
                paddingRight:optimizeWidth(10)
              }}>
                <Text style={[styles.main.textWhite, styles.main.fs_20, styles.main.textBold]}>
                  {!chatData?.isGroup ? `${friendData?.firstName} ${friendData?.lastName}` : ""}
                </Text>

                <Text style={[styles.main.textPrimary,{textAlign:"center",width:optimizeWidth(80)}]}>
                  {
                    getDatePreview(lastMessage.timeSent)
                  }
                </Text>

              </View>
              <Text style={[styles.main.textMuted, {marginTop:optimizeHeight(5), maxWidth:"78%"}, styles.main.textSemiBold]}>
                {lastMessage?.sentBy === authUser?.username && "You: "}{lastMessage?.text}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>

      <View style={{
          height:optimizeHeight(1),
          borderRadius:999,
          width:"80%",
          marginLeft:"20%",
          backgroundColor:"#0F1D25"
      }}>
      </View>
    </View>
  )
}

export default ChatComponent