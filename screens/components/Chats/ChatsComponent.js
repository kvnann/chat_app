import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { optimizeHeight, optimizeWidth, colors } from '../../../lib/helpers'
import '../../assets'
import ChatComponent from './ChatComponent'

const ChatsComponent = ({ chatsData, authUser }) => {

  return (
    <ScrollView style={{
      marginTop:optimizeHeight(10)
    }}>
      {(chatsData && authUser) ?
        chatsData.map(chatData=>{
          return <ChatComponent key={chatData.chatID} chatData={chatData} authUser={authUser}/>
        }):
        <View></View>
      }

    </ScrollView>
  )
}

export default ChatsComponent