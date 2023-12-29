import React from 'react'
import { Text, View } from 'react-native'
import { colors, optimizeHeight, optimizeWidth } from '../../lib/helpers'

const SplashScreen = () => {
  return (
    <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.PRIMARY_DARK,
    }}>
        <View style={{
            transform:[{translateY:optimizeHeight(-80)}],
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        }}>
        <View style={{
            backgroundColor:colors.PRIMARY_TEXT,
            height:optimizeHeight(150),
            width:optimizeWidth(120),
            
            borderTopLeftRadius:999,
            borderTopRightRadius:999,
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        }}>
            <View style={{
                backgroundColor:colors.PRIMARY_DARK,
                height:optimizeHeight(120),
                width:optimizeWidth(96),
                borderTopLeftRadius:999,
                borderTopRightRadius:999,
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
            }}>
                <View style={{
                    backgroundColor:colors.PRIMARY_TEXT,
                    height:optimizeHeight(110),
                    width:optimizeWidth(88),
                    borderTopLeftRadius:999,
                    borderTopRightRadius:999,
                }}>
                </View>
            </View>
        </View>
        <Text style={{
            fontSize:optimizeWidth(45),
            fontWeight:"700",
            color:colors.WHITE,
            marginTop:optimizeHeight(20)
        }}>PingUp!</Text></View>
    </View>
  )
}

export default SplashScreen