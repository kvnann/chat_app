import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StatusBar, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Animated } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { styles } from '../../../assets'
import { optimizeHeight, optimizeWidth, colors, lastSeenString, createDataURI } from '../../../../lib/helpers'
import {ChatsComponent} from '../../../components'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';
import { BackIcon, SendIcon } from '../../../../assets/icons'
import { getUserData } from '../../../../lib/handlers'
import default_pp from '../../../../assets/base64/default_pp'
import { InfiniteAnimationIcon } from '../../../components/animations/animations'

const ChatHeader = ({ friendData }) => {
  const navigation = useNavigation();

  return (
    <View style={{
        display:'flex',
        flex:1,
        width:"100%",
        backgroundColor:colors.PRIMARY_LIGHT,
        height:optimizeHeight(100),
        position:'absolute',
        zIndex:1
      }}>
        <SafeAreaView style={[styles.main.container,{
          width:"100%",
        }]}>
          <View style={{
            display:'flex',
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:'center'
          }}>
            <View style={{
              display:'flex',
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems:'center'
            }}>
              <TouchableOpacity onPress={()=>{
                navigation.goBack();
              }} style={{
                paddingLeft:optimizeWidth(8),
                height:"100%"
              }}>
                <BackIcon fill={colors.PRIMARY_TEXT} width={20} height={20}/>
              </TouchableOpacity>

              <View style={{
                marginLeft:optimizeWidth(8)
              }}>
                <Image source={{uri:createDataURI(friendData?.pp ?? default_pp)}} style={{
                  width:45,
                  height:45,
                  borderRadius:999
                }}/>
              </View>
              
              <View style={{
                display:'flex',
                justifyContent:'center',
                flexDirection:'column',
                marginLeft:optimizeWidth(10)
              }}>
                <Text style={{
                  color:colors.WHITE,
                  fontWeight:600,
                  fontSize:optimizeWidth(18)
                }}>{friendData?.firstName} {friendData?.lastName}</Text>
                <Text style={{
                  color:colors.MUTED,
                  marginTop:optimizeHeight(3),
                  fontSize:optimizeWidth(13)
                }}>
                last seen today 12:33
                {/* {lastSeenString(friendData?.lastSeen)} */}
                </Text>
              </View>
            </View>

          </View>
        </SafeAreaView>
      </View>
  )
}

export default ChatHeader