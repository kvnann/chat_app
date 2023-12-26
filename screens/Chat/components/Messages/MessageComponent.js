import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { colors, getHoursAndMinutes, optimizeHeight, optimizeWidth, sortArrayByTime } from '../../../../lib/helpers'

const MessageComponent = ({ messageData, sentByMe, partnerData }) => {

    useEffect(()=>{
    },[])
    

  return (
    <View style={{
        width:"100%",
        display:'flex',
        flexDirection:"column",
        alignItems:sentByMe?"flex-end":"flex-start",
        marginBottom:optimizeHeight(!messageData?.lastInTheRow && messageData.existsInARow ? 5 : 18),
        margin:0
    }}>
        <View style={{
            display:'flex',
            flexDirection:"row",
            alignItems:'flex-end',
        }}>
            {!sentByMe &&
                <View style={{
                    width:"9%",
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    paddingBottom:optimizeHeight(3)
                }}>
                    {
                        (messageData?.existsInARow && messageData?.lastInTheRow) || !messageData?.existsInARow ?
                        <Image source={{uri:partnerData?.pp}} style={{
                            width:optimizeWidth(25),
                            height:optimizeWidth(25),
                            borderRadius:999
                        }}/> 
                        : 
                        <View style={{
                            width:optimizeWidth(25),
                            height:optimizeWidth(25),
                        }}/> 
                    }
                </View>
            }
            <View style={{
                backgroundColor:sentByMe?colors.PRIMARY_TEXT:colors.PRIMARY_EXTRALIGHT,
                paddingTop:optimizeHeight(10),
                paddingHorizontal:optimizeHeight(10),
                borderBottomLeftRadius:optimizeWidth(sentByMe?15: messageData?.lastInTheRow || !messageData.existsInARow ? 15 : 7),
                borderTopLeftRadius:optimizeWidth(sentByMe?15: messageData?.firstInTheRow || !messageData.existsInARow ? 15 : 7),
                borderBottomRightRadius:optimizeWidth(!sentByMe?15: messageData?.lastInTheRow || !messageData.existsInARow ? 15 : 7),
                borderTopRightRadius:optimizeWidth(!sentByMe?15: messageData?.firstInTheRow || !messageData.existsInARow ? 15 : 7),
                maxWidth:"72%",
                marginRight:sentByMe?optimizeWidth(10): 0,
                flexDirection:'column'
            }}>

                <Text style={{
                    color:colors.WHITE,
                    fontSize:optimizeWidth(16)
                }}>{messageData?.text} <View style={{
                    width:optimizeWidth(10),
                    height:optimizeHeight(10), 
                    paddingLeft:optimizeWidth(40)
                    }}/>
                </Text>

                <View style={{
                    transform:[{translateY:optimizeHeight(-10)}],
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'flex-end'
                }}>
                    <Text style={{
                        color:sentByMe ? colors.MUTED_LIGHT: colors.MUTED_DARK,
                        fontSize:optimizeWidth(12),
                    }}>{getHoursAndMinutes(messageData.time)}</Text>
                </View>
                
            </View>
        </View>
    </View>
  )
}

export default MessageComponent