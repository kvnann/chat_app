import React, { useEffect, useState, useRef } from 'react'
import { View, KeyboardAvoidingView, Keyboard } from 'react-native'
import { optimizeHeight, colors, messageParsing } from '../../lib/helpers'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';
import { getUserData, getChatData, getSavedUserData } from '../../lib/handlers'
import ChatHeader from './components/ChatHeader/ChatHeader';
import MessageBox from './components/MessageBox/MessageBox';
import Messages from './components/Messages/Messages';

import { Audio } from 'expo-av';

const Chat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {params} = route;

  // const [sound, setSound] = useState();

  // async function playSound() {
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/sound_sendMessage.mp3')
  //   );
  //   setSound(sound);

  //   console.log('Playing Sound');
  //   await sound.playAsync();
  // }

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);
  
  const [partnerData, setPartnerData] = useState(null);
  const [myData, setMyData] = useState(null);
  const [chatData, setChatData] = useState(null);

  //
  const scrollViewRef = useRef();
  const [percentScrolled, setPercentScrolled] = useState(100)

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    setPercentScrolled((contentOffset.y / (contentSize.height - layoutMeasurement.height)) * 100);
  };
  
  const scrollToBottom = (animated, noDelay) => {
      if (scrollViewRef.current) {
        setTimeout(() => {
          scrollViewRef.current.scrollToEnd({ animated: animated });
      }, noDelay?0:50);
      }
  };

  useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          scrollToBottom(true,true);
        }
      );
  
      return () => {
        keyboardDidShowListener.remove();
      };
  }, [percentScrolled]);

  useEffect(()=>{
      setTimeout(() => {
          scrollToBottom(false)
      }, 100);
  },[])

  //
  
  useEffect(() => {

    const savedUserData = getSavedUserData();
    setMyData(savedUserData);

    const selectedUser = getUserData(params?.tag);
    setPartnerData(selectedUser);
    
    let selectedChat = getChatData(params?.chatID);

    const messagesSorted = messageParsing(selectedChat?.messages);

    selectedChat = {...selectedChat, messages:messagesSorted}

    setChatData(selectedChat ? selectedChat:{
      messages:[]
    });
  }, []);

  const handleSendMessage = (messageData)=>{
    let newChatData = {...chatData};
    newChatData.messages = newChatData?.messages ? newChatData.messages : []
    newChatData?.messages.unshift(messageData);
    newChatData.messages = messageParsing(newChatData?.messages);
    setChatData(newChatData);
    scrollToBottom(true);
    // playSound();
  }


  return (
    <View style={[{
      backgroundColor:colors.PRIMARY_DARK,
      flex:1,
      border:"none"
    }]}>

        <ChatHeader partnerData={partnerData}/>

        <View
          style={{
            flex:1,
          }}
        >
          <View style={{
            flex:1,
          }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              enabled
              style={{
                flex:1,
              }}
            >
              <View
              style={{
                marginTop:optimizeHeight(100),
                flex:1,
              }}>
                <Messages scrollViewRef={scrollViewRef} handleScroll={handleScroll} myData={myData} messages={chatData?.messages} partnerData={partnerData}/>
              </View>

              <MessageBox tag={myData?.tag} sendMessage={handleSendMessage}/>
            
            </KeyboardAvoidingView>
          </View>
        </View>

    </View>
  )
}

export default Chat