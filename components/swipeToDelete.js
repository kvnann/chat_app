import React from 'react'
import { View, Text, SafeAreaView, TouchableHighlight, TouchableOpacity, StyleSheet  } from 'react-native'
import Animated, { useSharedValue, withTiming, Easing, useAnimatedStyle } from 'react-native-reanimated'

const SwipeToDelete = () => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const fadeIn = async()=>{
        translateY.value = withTiming(100,{duration:500, easing: Easing.inOut(Easing.back(3))});
        translateX.value = withTiming(100,{duration:500, easing: Easing.inOut(Easing.back(5))});
        setTimeout(()=>{
            translateY.value = withTiming(200,{duration:500, easing: Easing.inOut(Easing.back(5))});
            translateX.value = withTiming(-100,{duration:500, easing: Easing.inOut(Easing.back(5))});
        },500)
        setTimeout(()=>{
            translateY.value = withTiming(300,{duration:500, easing: Easing.inOut(Easing.back(5))});
            translateX.value = withTiming(100,{duration:500, easing: Easing.inOut(Easing.back(5))});
        },1000)
        setTimeout(()=>{
            translateY.value = withTiming(200,{duration:500, easing: Easing.inOut(Easing.back(3))});
            translateX.value = withTiming(-100,{duration:500, easing: Easing.inOut(Easing.back(5))});
        },1500)
        setTimeout(()=>{
            translateY.value = withTiming(100,{duration:500, easing: Easing.inOut(Easing.back(5))});
            translateX.value = withTiming(100,{duration:500, easing: Easing.inOut(Easing.back(5))});
        },2000)
        setTimeout(()=>{
            translateY.value = withTiming(0,{duration:500, easing: Easing.inOut(Easing.back(5))});
            translateX.value = withTiming(0,{duration:500, easing: Easing.inOut(Easing.back(5))});
        },2500)
    }

    const animatedText = useAnimatedStyle(() => ({
        backgroundColor:"#d4d4d4",
        borderRadius:20,
        display:"flex",
        alignItems:'center',
        width:200,
        padding:15,
        transform:[{translateX: translateX.value},{translateY: translateY.value}],
        opacity:1
      }));
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{
            marginTop:50,
            display:'flex',
            alignItems:'center'
        }}>
            <Animated.View style={animatedText}><Text style={{
            }}>Hello, SafeAreaView!</Text>
            </Animated.View>

            <TouchableOpacity style={{
                backgroundColor:"black",
                borderRadius:20,
                display:"flex",
                marginTop:15,
                alignItems:'center',
                width:100,
                padding:15
            }} onPress={fadeIn}>
                <Text style={{
                    color:"white",
                }}>
                    Click Me!
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}



export default SwipeToDelete