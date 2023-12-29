import React, { useEffect, useState, useRef } from 'react'
import { View, KeyboardAvoidingView, Keyboard } from 'react-native'
import { optimizeHeight, colors, messageParsing } from '../../lib/helpers'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';
import { getUserData, getChatData } from '../../lib/handlers'
import ChatHeader from './components/ChatHeader/ChatHeader';
import MessageBox from './components/MessageBox/MessageBox';
import Messages from './components/Messages/Messages';

import { Audio } from 'expo-av';
import { getOneLoadedChat } from '../../lib/handlers/storage/loadedChats.storage';
import { getAuthUser, getOneLoadedUser } from '../../lib/handlers/storage.handlers';

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
  
  const [friendData, setFriendData] = useState(null);
  const [authUserData, setAuthUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  //
  const scrollViewRef = useRef();
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 })

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setScrollPosition({ x: contentOffset.x, y: contentOffset.y });
  };
  
  const scrollToBottom = (animated, noDelay) => {
      if (scrollViewRef.current) {
        setTimeout(() => {
          scrollViewRef.current.scrollToEnd({ animated: animated });
      }, noDelay?0:50);
      }
  };

  const scrollToPosition = (yCoord, isAnimated) => {
    scrollViewRef.current.scrollTo({ x: 0, y: yCoord, animated: isAnimated });
  };

  useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          // scrollToPosition(scrollPosition.y + 500)
        }
      );
  
      return () => {
        keyboardDidShowListener.remove();
      };
  }, [scrollPosition]);

  useEffect(()=>{
      setTimeout(() => {
        scrollToPosition(1050,false)
      }, 100);
  },[]);

  const getInitialData = async()=>{
    let savedChatData = await getOneLoadedChat(params?.chatID);
    const authUser = await getAuthUser();
    if(!savedChatData?.isGroup){
      const friendUsername = !savedChatData?.isGroup ? JSON.parse(savedChatData.participants).filter(p=>p!==authUser?.username)[0] : null;
      if(!friendUsername){
        return;
      }
      const savedFriendData = await getOneLoadedUser(friendUsername);
      setFriendData(savedFriendData);
    }
    setAuthUserData(authUser);

    const messagesSorted = messageParsing(savedChatData?.messages);

    savedChatData = {...savedChatData, messages:messagesSorted}

    setChatData(savedChatData? savedChatData:{
      messages:[]
    });
  }

  useEffect(()=>{
    getInitialData();
  },[])

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

        <ChatHeader friendData={friendData}/>

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
                <Messages scrollViewRef={scrollViewRef} handleScroll={handleScroll} scrollPosition={scrollPosition} authUser={authUserData} messages={chatData?.messages} friendData={friendData}/>
              </View>

              <MessageBox username={authUserData?.username} sendMessage={handleSendMessage}/>
            
            </KeyboardAvoidingView>
          </View>
        </View>

    </View>
  )
}

export default Chat