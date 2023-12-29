import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { colors, createDataURI, getHoursAndMinutes, getScreenDimensions, optimizeHeight, optimizeWidth, sortArrayByTime } from '../../../../lib/helpers'
import default_pp from '../../../../assets/base64/default_pp'

const MessageComponent = ({ messageData, sentByMe, friendData, scrollPosition }) => {

    const messageRef = useRef(null);
    const [messagePositionY, setMessagePositionY] = useState(null);
    const screenHeight = getScreenDimensions().y;
    const [messageSize, setMessageSize] = useState({x:0, y:0});
    
    const getMessagePosition = ()=>{
        messageRef.current.measure((x, y, width, height, pageX, pageY) => {
            setMessagePositionY(pageY);
        });
    }

    useEffect(()=>{
        messageRef.current.measure((x, y, width, height, pageX, pageY) => {
            setMessageSize({x:width,y:height})
        });
    },[])
    useEffect(()=>{
        getMessagePosition();
    },[scrollPosition])
    useEffect(()=>{
        if(messageData.text == 'oke'){
            if(messagePositionY - optimizeHeight(43.3 - messageSize.y)>=optimizeHeight(61.333335876464844) && messagePositionY <= screenHeight - optimizeHeight(90.4)){
                // console.log(true)

            }else{
                // console.log(false)
            }
        }
    },[scrollPosition])


  return (
    <View style={{
        width:"100%",
        display:'flex',
        flexDirection:"column",
        alignItems:sentByMe?"flex-end":"flex-start",
        marginBottom:optimizeHeight(!messageData?.lastInTheRow && messageData.existsInARow ? 5 : 18),
        margin:0
    }}
    >

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
                        <Image source={{uri:createDataURI(friendData?.pp ?? default_pp)}} style={{
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
            }}
            ref={messageRef}
            >

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
                        color:sentByMe ? colors.PRIMARY_EXTRALIGHT: colors.MUTED_DARK,
                        fontSize:optimizeWidth(12),
                    }}>{getHoursAndMinutes(messageData.timeSent)}</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default MessageComponent