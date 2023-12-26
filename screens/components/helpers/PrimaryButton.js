import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { optimizeHeight, optimizeWidth } from '../../../lib/helpers'
import { colors } from '../../../lib/helpers'

const PrimaryButton = ({ type, moreStyle, text, onPress, textMoreStyle, loading }) => {

    return <TouchableOpacity onPress={onPress} style={[{
        paddingHorizontal:optimizeHeight(52),
        paddingVertical:optimizeWidth(14),
        backgroundColor:type==="dark"?colors.PRIMARY_LIGHT:colors.PRIMARY_TEXT,
        borderRadius:999
      },moreStyle]}>
        {
          loading?
          <ActivityIndicator color={colors.PRIMARY_DARK}/>:
          <Text style={[{
            color:colors.WHITE, 
            textAlign:'center',
            fontSize:optimizeWidth(15),
          }, textMoreStyle]}>
            {text}
          </Text>
        }

    </TouchableOpacity>
}

export default PrimaryButton