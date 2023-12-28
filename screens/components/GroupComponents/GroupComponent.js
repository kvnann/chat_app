import React from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import { colors, optimizeHeight, optimizeWidth } from '../../../lib/helpers'
import { ChevronRightIcon } from '../../../assets/icons'
import { useNavigation } from '@react-navigation/native'
import { handleLogout } from '../../../lib/handlers/auth.handlers'


const GroupComponent = ({ componentData, last, first }) => {
    const navigation = useNavigation();
  return (


    <TouchableHighlight onPress={()=>{
        if(componentData?.linkTo === 'logout'){
            handleLogout(navigation);
        }
    }} style={{
        borderTopLeftRadius:first ? optimizeWidth(20) : 0,
        borderTopRightRadius:first ? optimizeWidth(20) : 0,
        borderBottomLeftRadius:last ? optimizeWidth(20) : 0,
        borderBottomRightRadius:last ? optimizeWidth(20) : 0,
        paddingBottom:last?optimizeHeight(12):0,
        paddingTop:first?optimizeHeight(3):0,
    }}>
        <View style={{
            marginTop:optimizeHeight(10),
            paddingHorizontal:optimizeWidth(15),
            display:'flex',
            flexDirection:'row',
            alignItems:last?'center' : 'flex-start',
            width:'100%',

        }}> 
            {componentData.Icon && 
                <View>
                    <componentData.Icon width={optimizeWidth(25)} height={optimizeWidth(25)} fill={componentData?.fill}/>
                </View>
            }
            <View style={{
                width:'94%',
                marginLeft:optimizeWidth(11)
            }}>
                <View style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    width:'95%',
                }}>
                    <View>
                        <Text style={{
                            color:colors.WHITE,
                            fontSize:optimizeWidth(16),
                            fontWeight:"500"
                        }}>
                            {componentData?.text}
                        </Text>
                    </View>
                    <View style={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center',
                    }}>
                        <Text style={{
                            color:colors.MUTED,
                            fontSize:optimizeWidth(15),
                            marginRight:optimizeWidth(3),
                            fontWeight:"500"
                        }}>
                            {componentData?.shortInfo}
                        </Text>
                        <View style={{
                        }}>
                            <ChevronRightIcon width={optimizeWidth(15)} height={optimizeHeight(15)} style={{
                            }} fill={colors.MUTED}/>
                        </View>
                    </View>
                </View>
                {
                    !last && 
                    <View style={{
                        width:'100%',
                        height:optimizeHeight(1),
                        backgroundColor:colors.PRIMARY_MUTED,
                        marginTop:optimizeHeight(10),
                    }}></View>
                }
            </View>
        </View>
    </TouchableHighlight>
  )
}

export default GroupComponent