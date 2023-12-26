import React, { useRef, useState, useEffect } from 'react'
import SuggestedUserComponent from './SuggestedUserComponent'
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native'
import { colors, optimizeHeight, optimizeWidth } from '../../../lib/helpers'
import { getAllSavedUsersData } from '../../../lib/handlers'

const SuggestedUserComponents = () => {
  const flatListRef = useRef(null)

    const [allUsersData, setAllUsersData] = useState(null);

    useEffect(()=>{
      const savedUsersData = getAllSavedUsersData();
      setAllUsersData(savedUsersData);
    },[])

    const renderItem = ({item})=>{
      return <SuggestedUserComponent key={item.userID} data={item}/>
    }
  return (
    <View style={{
      maxHeight:optimizeHeight(336)
    }}>
      <FlatList
        ref={flatListRef}
        data={allUsersData}
        renderItem={renderItem}
        keyExtractor={(item)=>item.userID}
        horizontal={true}
        contentContainerStyle={{
          marginTop:optimizeHeight(20),
        }}
        ItemSeparatorComponent={() => (
          <View onPress={()=>(null)} style={{
            height:"100%",
            width:1,
            display:'flex',
            justifyContent:'center',
          }}>
            <View style={{
              height:"60%",
              width:1,
              backgroundColor:colors.PRIMARY_LIGHT
            }}>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
      />
    </View>
  )
}

export default SuggestedUserComponents