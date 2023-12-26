import React from 'react'
import { TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native'
import { optimizeHeight, optimizeWidth } from '../../../lib/helpers'
import { colors } from '../../../lib/helpers'

const PrimaryLink = ({ moreStyle, text, onPress }) => {

    return <TouchableWithoutFeedback onPress={onPress}>
        <Text style={[{
            color:colors.PRIMARY_TEXT, 
            fontSize:optimizeWidth(18),
        },moreStyle]}>
            {text}
        </Text>
    </TouchableWithoutFeedback>
}

export default PrimaryLink