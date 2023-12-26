import React, { useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { styles } from '../assets'
import { optimizeHeight, optimizeWidth, colors } from '../../lib/helpers'
import { SearchIcon } from '../../assets/icons'
import { SuggestedUserComponents } from '../components'

const Explore = () => {
  const [searchValue, setSearchValue] = useState(null);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={[styles.main.container , {
        backgroundColor:colors.PRIMARY_DARK,
        flex:1,
        border:"none"
      }]}>

          <View style={{
              marginTop:optimizeHeight(20),
              display:'flex',
              justifyContent:"center",
              alignItems:'center',
          }}>
            <View
              style={{
              width:"75%", 
              height:optimizeHeight(35), 
              borderRadius:optimizeWidth(10),
              backgroundColor:colors.PRIMARY_LIGHT,
              display:'flex',
              flexDirection:'row'
            }}>
              <View style={{
                display:'flex',
                width:'10%',
                alignItems:'center',
                justifyContent:'center'
              }}>
                <SearchIcon width={15} height={15} fill={colors.WHITE}/>
              </View>

              <TextInput
                style={[styles.explore.searchInput,{height:'100%', width:"90%"}]}
                placeholder={'Search'}
                placeholderTextColor={colors.WHITE}
                value={searchValue}
                onChangeText={(value)=>{setSearchValue(value)}}
                returnKeyType='done'
              />
            </View>
          </View>

          <View style={[{
            marginTop:optimizeHeight(28),
            paddingLeft:optimizeWidth(28),
          }]}>
            <Text style={[styles.main.textBold, styles.main.textWhite, styles.main.fs_40]}>
              Explore
            </Text>
          </View>
          
          <ScrollView style={{
            flex:1
          }}>
            <SuggestedUserComponents/>
          </ScrollView>


      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Explore