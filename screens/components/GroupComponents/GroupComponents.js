import React from 'react'
import { View } from 'react-native'
import { colors, optimizeHeight, optimizeWidth } from '../../../lib/helpers'
import GroupComponent from './GroupComponent'

const GroupComponents = ({ componentsData }) => {
  return (
    <View style={{
        width:'94%',
        backgroundColor:colors.PRIMARY_LIGHT,
        borderRadius:optimizeWidth(20),
        
    }}>
        {componentsData.map(componentData =>{
            return <GroupComponent 
                componentData={componentData}
                key={componentData.id}
                first={componentsData[0].id === componentData.id}
                last={componentsData[componentsData.length - 1].id === componentData.id}
            />
        })}
    </View>
  )
}

export default GroupComponents