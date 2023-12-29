import React, { useEffect, useState, useRef } from 'react'
import { View, Text, ScrollView, Keyboard } from 'react-native'
import MessageComponent from './MessageComponent'
import { colors, createRandomString, optimizeHeight, optimizeWidth } from '../../../../lib/helpers'

const Messages = ({  handleScroll, messages, authUser, friendData, scrollViewRef, scrollPosition }) => {

  return (
    <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{
        }}
    >
        <View>
          <Text>
            
          </Text>
        </View>
        <View style={{
            width:90.33334350585938,
            height:43.6666259765625,
            backgroundColor:'white',
            position:'absolute',
            top:100
        }}>

        </View>
        {
            messages?.length > 0 ? messages.map(message=>{
                if(message.type === 3){
                  return <View key={createRandomString(5)} style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    marginBottom:optimizeHeight(21)
                  }}>
                    <Text style={{
                      color:colors.MUTED_DARK
                    }}>
                      {message?.text}
                    </Text>
                  </View>
                }
                return <MessageComponent key={message.messageID} messageData={message} sentByMe={message.sentBy === authUser.username} friendData={friendData} scrollPosition={scrollPosition}/>
            }) : <View style={{
                display:'flex',
                marginTop:optimizeHeight(30),
                alignItems:"center"
            }}><Text style={{
                color:colors.MUTED,
                fontSize:optimizeWidth(18)
            }}>No messages found</Text></View>
        }
    </ScrollView>
  )
}

export default Messages