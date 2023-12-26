import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'
import { saveTokensAsync, sendRequestAsync } from "../handlers";

const BACKEND_ROUTES = {
    login: "/auth/login",
    auth: "/auth"
}

export const getAuthAsync = async(callback)=>{
    const token = await AsyncStorage.getItem('authorization');
    if(!token){
        try{
            await AsyncStorage.setItem('authorization', '');
        }catch(e){
            console.log(e);
        }
    }
    return sendRequestAsync(`${BACKEND_ROUTES.auth}`, "GET", null, async(err, response)=>{
        if(response?.data?.newAccessToken){
            await AsyncStorage.setItem('authorization', response.data.newAccessToken);
        }
        return callback(err,response);
    });
}

export const loginAsync = async(username, password, callback)=>{
    return sendRequestAsync(`${BACKEND_ROUTES.login}`, "POST", {
        username,
        password
    }, async(err, response)=>{
        if(err){
          if(typeof(err?.response?.data) === 'string'){
            return callback({message:err.response.data}, response);
          }
          return callback({message:"Unknown error occured, please try again"}, response);
        }
        const {accessToken, refreshToken} = response.data;
        const isDataSaved = await saveTokensAsync(accessToken,refreshToken);
        if(isDataSaved){
          return callback(null,response);
        }
        else{
          return callback({message:"Unknown error occured, please try again"},response);    
        }
    });
}