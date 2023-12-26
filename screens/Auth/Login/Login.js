import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, View, Button, StyleSheet, SafeAreaView } from 'react-native'
import { colors, optimizeHeight, optimizeWidth } from '../../../lib/helpers'
import { styles } from '../../assets';
import { PrimaryButton } from '../../components';
import { getAuthAsync, loginAsync } from '../../../lib/handlers/auth';
import { useNavigation } from '@react-navigation/native'
import { getUserDataAsync, saveTokensAsync } from '../../../lib/handlers';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async(e)=>{
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
    await loginAsync(username,password,async(err,response)=>{
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
            }}>Login</Text>
            <View>
              <TextInput
                style={[styles.main.input, {
                  marginTop:optimizeHeight(40),
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
            }} text={"Login"} loading={loading} onPress={handleLogin}/>
          </View>
          <View></View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Login