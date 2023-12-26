import React from 'react'
import { Text, View } from 'react-native'

const Messages = ({ messages }) => {
  return(
    <View>
      {
        messages.map(message=>{
        return (
        <View style={{marginTop:10}}>
          <Text>{message.body}</Text>
        </View>
        )
      })
      }
    </View>
  )
}

export default Messages