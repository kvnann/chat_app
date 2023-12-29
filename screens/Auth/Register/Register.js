import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, View, Button, StyleSheet, SafeAreaView } from 'react-native'
import { colors, optimizeHeight, optimizeWidth } from '../../../lib/helpers'
import { styles } from '../../assets';
import { PrimaryButton } from '../../components';
import { getAuthAsync, loginAsync, registerAsync } from '../../../lib/handlers/auth.handlers';
import { useNavigation } from '@react-navigation/native'
import { getUserDataAsync, saveTokensAsync } from '../../../lib/handlers';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  
  const setAuthFuncitonAsync = async()=>{
    const savedData = await getUserDataAsync();
    if(!savedData){
      return false;
    }
    // navigation.replace("home");
  }
  useEffect(() => {
    setAuthFuncitonAsync();
  }, []);

  const handleRegister = async(e)=>{
    setLoading(true);
    if(!username){
      setErrorMessage("Please enter a username");
      setLoading(false);
      return;
    }
    if(!password){
      setErrorMessage("Please the password");
      setLoading(false);
      return;
    }
    await registerAsync(firstName, lastName, username, email, password, async(err,response)=>{
      if(err){
        setErrorMessage(err.message);
        setLoading(false);
        return;
      }
      if(response?.status === 200){
        navigation.replace("home");
        setLoading(false);
      }
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
      style={{
        flex:1,
        backgroundColor:colors.PRIMARY_DARK
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{
          flex:1,
          justifyContent:'space-around'
        }}>
          <View style={{
            display:"flex",
            alignItems:'center',
          }}> 
            <Text style={{
              fontSize:optimizeWidth(40),
              color:colors.WHITE,
              fontWeight:'700'
            }}>Register</Text>
            <View>
              <TextInput style={[styles.main.input, {opacity:0}]}/>
              <View style={{
                display:'flex',
                flexDirection:'row'
              }}>

              <TextInput
                style={[styles.main.input, {
                  marginHorizontal:optimizeWidth(4),
                  fontSize:optimizeWidth(17),
                  width:optimizeWidth(124)
                }]}
                placeholder={'First name'}
                placeholderTextColor={colors.MUTED}
                value={firstName}
                onChangeText={(value)=>{setFirstName(value)}}
                returnKeyType='done'
              />
              <TextInput
                style={[styles.main.input, {
                  marginHorizontal:optimizeWidth(4),
                  fontSize:optimizeWidth(17),
                  width:optimizeWidth(124)
                }]}
                placeholder={'Last name'}
                placeholderTextColor={colors.MUTED}
                value={lastName}
                onChangeText={(value)=>{setLastName(value)}}
                returnKeyType='done'
              />
              </View>
              <TextInput
                style={[styles.main.input, {
                  marginTop:optimizeHeight(15),
                  fontSize:optimizeWidth(17)
                }]}
                placeholder={'Username'}
                placeholderTextColor={colors.MUTED}
                value={username}
                onChangeText={(value)=>{setUsername(value)}}
                returnKeyType='done'
              />
              <TextInput
                style={[styles.main.input, {
                  marginTop:optimizeHeight(15),
                  fontSize:optimizeWidth(17)
                }]}
                placeholder={'Email'}
                placeholderTextColor={colors.MUTED}
                value={email}
                keyboardType='email-address'
                onChangeText={(value)=>{setEmail(value)}}
                returnKeyType='done'
              />
              <TextInput
                style={[styles.main.input, {
                  marginTop:optimizeHeight(15),
                  fontSize:optimizeWidth(17)
                }]}
                placeholder={'Password'}
                secureTextEntry
                placeholderTextColor={colors.MUTED}
                value={password}
                onChangeText={(value)=>{setPassword(value)}}
                returnKeyType='done'
              />
              <Text style={{
                textAlign:'center',
                color:colors.DANGER,
                marginTop:optimizeHeight(10),
              }}>
                {errorMessage}
              </Text>
            </View>

            <PrimaryButton moreStyle={{
              marginTop:optimizeHeight(22),
              paddingHorizontal:optimizeWidth(80),
              paddingVertical:optimizeHeight(12),
            }} textMoreStyle={{
              fontSize:optimizeWidth(16)
            }} text={"Register"} loading={loading} onPress={handleRegister}/>
            <Text style={{
              color:colors.WHITE,
              marginTop:optimizeHeight(30)
            }} >
              Already have an account? <TouchableWithoutFeedback onPress={()=>{
                navigation.replace('login')
              }}><Text style={{color:colors.PRIMARY_TEXT}}>Login here!</Text></TouchableWithoutFeedback>
            </Text>
          </View>
          <View></View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Register