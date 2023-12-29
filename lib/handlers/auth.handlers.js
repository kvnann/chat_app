import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'
import { saveTokensAsync, sendRequestAsync } from "../handlers";
import { saveAccessToken, saveAuthUser, saveLoadedChats, saveLoadedUsers, saveRefreshToken } from "./storage.handlers";
import { BACKEND_ROUTES } from "./config.handlers";

export const getAuthAsync = async(callback)=>{
    return sendRequestAsync(`${BACKEND_ROUTES.auth}`, "GET", null, async(err, response)=>{
        if(err){
          if(typeof(err?.response?.data) === 'string'){
            return callback({message:err.response.data}, response);
          }
          return callback({message:"Unknown error occured, please try again"}, response);
        }
        if(response?.data?.newAccessToken){
            await saveAccessToken(response.data.newAccessToken);
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

export const registerAsync = async(firstName, lastName, username, email, password, callback)=>{
    return sendRequestAsync(`${BACKEND_ROUTES.register}`, "POST", {
        username,
        password,
        firstName,
        lastName,
        email
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
export const handleLogout = async(navigation)=>{ 
    saveAccessToken("");
    saveRefreshToken("");
    saveAuthUser({});
    saveLoadedChats([]);
    navigation.replace("login");
}