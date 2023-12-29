import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native'
import { optimizeHeight, optimizeWidth, colors } from '../../../lib/helpers'
import '../../assets'
import ChatComponent from './ChatComponent'

const ChatsComponent = ({ chatsData, authUser }) => {

  return (
    <View style={{
      flex:1
    }}>
        <ScrollView style={{
          marginTop:optimizeHeight(10),
        }}>
        {(chatsData && authUser) ?
          chatsData.map(chatData=>{
            return(
                <ChatComponent key={chatData.chatID} chatData={chatData} authUser={authUser}/>
            )
          }) : <View></View>
        }
        </ScrollView>
        {(!chatsData || !authUser) ?        
        <View style={{
            flex:1,
            transform:[{translateY:optimizeHeight(-100)}]
          }}>
            <ActivityIndicator size={'large'} color={colors.MUTED_DARK}/>
        </View> : <View></View>
        }

    </View>
  )
}

export default ChatsComponent