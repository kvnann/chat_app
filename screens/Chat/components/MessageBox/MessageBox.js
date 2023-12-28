import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StatusBar, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Animated } from 'react-native'
import { styles } from '../../../assets'
import { optimizeHeight, optimizeWidth, colors, createRandomString } from '../../../../lib/helpers'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';
import { SendIcon } from '../../../../assets/icons'
import { InfiniteAnimationIcon } from '../../../components/animations/animations'

const MessageBox = ({sendMessage, username}) => {
  
    const [messageValue, setMessageValue] = useState(null);
  
    useEffect(() => {
      if(messageValue && messageValue.trim() !== ''){
        sendButtonShow(true);
      }
      else{
        sendButtonShow(false);
      }
    }, [messageValue])
  
    // Send Icon Animation
  
    const sendButtonOpacity = useRef(new Animated.Value(0)).current;
  
    const sendButtonShow = (show) => {
      Animated.timing(sendButtonOpacity, {
        toValue: show?1:0,
        duration:200,
        useNativeDriver: true,
      }).start();
    }

    const prepareMessageObject = ()=>{
      if(!(messageValue?.trim()?.length > 0)){
        return;
      }
      const messageObject = {
        text:messageValue,
        timeSent:new Date(),
        messageID:createRandomString(20),
        sentBy:username,
        replyTo:null
      }

      sendMessage(messageObject);

      setMessageValue("")
    }

  return (
    <View style={{
        width:"100%",
        backgroundColor:colors.PRIMARY_LIGHT,
      }}>
        <SafeAreaView>
          <View style={{
            width:"100%",
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            paddingBottom:optimizeHeight(10)
          }}>
            <View
              style={{
              width:"80%", 
              // minHeight:optimizeHeight(15), 
              height:35,
              borderRadius:optimizeWidth(10),
              backgroundColor:colors.PRIMARY_EXTRALIGHT,
              display:'flex',
              flexDirection:'row',
              marginTop:optimizeHeight(9),
              alignSelf: 'stretch',
            }}>
              <TextInput
                style={[styles.explore.searchInput,{height:'100%', width:"90%", paddingHorizontal:optimizeWidth(10)}]}
                placeholder={'Type...'}
                placeholderTextColor={colors.MUTED}
                value={messageValue}
                onChangeText={(value)=>{setMessageValue(value)}}
                returnKeyType='default'
                multiline
                numberOfLines={1}
                editable
                autoCorrect={false}
              /> 
              <TouchableOpacity style={{
                display:'flex',
                width:'8%',
                alignItems:'center',
                justifyContent:'center'
              }}>
                <InfiniteAnimationIcon source={require("../../../../assets/animations/add.json")} speed={1} size={60}/>
              </TouchableOpacity>
            </View>
            <Animated.View style={{
              width:"9%",
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              height:optimizeHeight(35),
              marginTop:optimizeHeight(9), 
              marginLeft:optimizeWidth(10),
              transform:[{scale:sendButtonOpacity}],
              opacity:sendButtonOpacity
            }}>
              <TouchableOpacity style={{
                backgroundColor:colors.PRIMARY_TEXT,
                paddingHorizontal:10,
                paddingVertical:5,
                borderRadius:optimizeWidth(10)
              }} onPress={prepareMessageObject}>
                <SendIcon width={optimizeHeight(25)} height={optimizeHeight(25)} fill={colors.WHITE}/>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </SafeAreaView>
    </View>
  )
}

export default MessageBox