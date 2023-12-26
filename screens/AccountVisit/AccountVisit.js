import React, { useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from 'react-native'
import { styles } from '../assets'
import { optimizeHeight, optimizeWidth, colors } from '../../lib/helpers'
import { SearchIcon } from '../../assets/icons'
import { SuggestedUserComponents } from '../components'
import PrimaryButton from '../components/helpers/PrimaryButton'

const AccountVisit = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={[styles.main.container , {
        backgroundColor:colors.PRIMARY_DARK,
        flex:1,
        border:"none"
      }]}>

          <View style={[{
            marginTop:optimizeHeight(28),
          }]}>
            <Image source={require("../../assets/images/kvnann_background.png")} style={{
              width:"100%",
              height:optimizeHeight(235),
              borderRadius:optimizeWidth(20),
              zIndex:-1
            }}/>
          </View>

          <View style={{
            display:'flex',
            alignItems:'center',
            width:"100%",
            transform:[{translateY:optimizeHeight(-100)}],
            
          }}>
            <Image source={require("../../assets/images/pp.jpg")} style={{
              width:optimizeHeight(150),
              height:optimizeHeight(150),
              borderRadius:999,
              zIndex:1
            }}/>
          </View>

            <View style={{
              display:'flex',
              width:'100%',
              alignItems:'center',
              marginTop:optimizeHeight(-100)
            }}>
              <Text style={{
                color:colors.WHITE, 
                textAlign:'center',
                fontSize:optimizeWidth(27)
              }}>Kanan Abdullayev</Text>

              <Text style={{
                color:colors.PRIMARY_TEXT, 
                textAlign:'center',
                fontSize:optimizeWidth(15)
              }}>@kvnann</Text>

              <PrimaryButton moreStyle={{
                marginTop:optimizeHeight(16)
              }} text={"Send Request"}/>
              
            </View>
            

      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default AccountVisit