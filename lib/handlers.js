import settings_components from "./data/settings_components";
import savedUserData from "./data/savedUserData";
import allSavedUsersData from "./data/allSavedUsersData";
import chat_data from "./data/chat_data";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAccessToken, setRefreshToken } from "./handlers/storage";

export const BACKEND_HOST = "https://chat-app-back-tau.vercel.app"

export const sendRequestAsync = async(destination, method, body, callback)=>{
    if(["GET","POST","PUT","DELETE"].indexOf(method.toUpperCase()) === -1){
        return callback({message: "Invalid Method"}, null);
    }
    const token = await AsyncStorage.getItem('authorization');
    try{
        const requestDetails = {
            url: `${BACKEND_HOST}${destination}`,
            method,
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        if(method.toUpperCase() !== "GET"){
            requestDetails.data = body? JSON.stringify(body) : {}
        }
        const response =  await axios(requestDetails);
        return callback(false, response);
    }catch(e){
        return callback(e, null);
    }
}

export const getSavedUserData = ()=>{
    return savedUserData;
}

export const getUserData = (tag)=>{
    return allSavedUsersData.find(data=>data.tag === tag);
}

export const getChatData = (chatID) => {
    return chat_data.find(chat => chat.chatID === chatID);
}

export const getAllSavedUsersData = () => {
    return allSavedUsersData;
}

export const getSavedSettingsComponentsData = () => {
    return settings_components;
}

export const groupChatData = () => {
    return chat_data
}

export const setSavedUser = async(userData)=>{
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
}

export const getUserDataAsync = async()=>{
    try{
        const userData = JSON.parse(await AsyncStorage.getItem("userData"))
        return userData;
    }catch(e){
        return false;
    }
}

export const saveTokensAsync = async(accessToken, refreshToken)=>{
    if(accessToken){
        const tokenSaved = await setAccessToken(accessToken);
        if(!tokenSaved){
            return false;
        }
    }
    if(refreshToken){
        const tokenSaved = await setRefreshToken(refreshToken);
        if(!tokenSaved){
            return false;
        }
    }
    return true;
}