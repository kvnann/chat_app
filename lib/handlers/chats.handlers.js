import AsyncStorage from "@react-native-async-storage/async-storage"
import { sendRequestAsync } from "../handlers";
import { getAuthUser, getLoadedChats, saveAuthUser, saveLoadedChats, saveLoadedUsers, updateLoadedUserData } from "./storage.handlers";
import { updateAuthUser } from "./storage/authUser.storage";

const BACKEND_ROUTES = {
    initial: "/users/initial",
    userPhotos: "/users/photos"
}

export const getInitialData = async(forceUpdate, callback)=>{
    if(!forceUpdate){
        const response = {
            data: {
                chatsData: [],
                userData: []
            }
        }
        response.data.chatsData = await getLoadedChats();
        response.data.userData = await getAuthUser();
        if(!response.data.chatsData.length || !response.data.userData.length){
            return callback({message:"No saved found"}, null);
        }
        return callback(null, response);
    }
    const token = await AsyncStorage.getItem('authorization');
    if(!token){
        try{
            await AsyncStorage.setItem('authorization', '');
        }catch(e){
            console.log(e);
        }
    }
    return sendRequestAsync(`${BACKEND_ROUTES.initial}`, "GET", null, async(err, response)=>{
        if(err){
            if(typeof(err?.response?.data) === 'string'){
              return callback({message:err.response.data, error:err}, null);
            }
            return callback({message:"Unknown error occured, please try again", error:err}, null);
        }
        try{
            if(!await saveAuthUser(response.data.userData)){
                return callback({message:"Unknown error occured. Cannot access storage"},null);
            }
            if(!await saveLoadedUsers(response.data.friendsData)){
                return callback({message:"Unknown error occured. Cannot access storage"},null);
            }
            if(!await saveLoadedChats(response.data.chatsData)){
                return callback({message:"Unknown error occured. Cannot access storage"},null);
            }
            return callback(null,response);
        }catch(e){
            return callback({message:"Unknown error occured, please try again", error:e},null);
        }
    });
}

export const getUserPhotos = async(username, callback)=>{
    const token = await AsyncStorage.getItem('authorization');
    if(!token){
        try{
            await AsyncStorage.setItem('authorization', '');
        }catch(e){
            console.log(e);
        }
    }
    return sendRequestAsync(`${BACKEND_ROUTES.userPhotos}?u=${username}`, "GET", null, async(err, response)=>{
        if(err){
            if(typeof(err?.response?.data) === 'string'){
              return callback({message:err.response.data, error:err}, null);
            }
            return callback({message:"Unknown error occured, please try again", error:err}, null);
        }
        try{
            const authUserData = await getAuthUser();
            if(username === authUserData.username){
                if(!await updateAuthUser({pp:response.data.pp, backgroundImage: response.data.backgroundImage})){
                    return callback({message:"Unknown error occured. Cannot access storage"},null);
                }
                return callback(null,response);
            }
            if(!await updateLoadedUserData(response.data.username, {pp:response.data.pp, backgroundImage: response.data.backgroundImage})){
                console.log(response.data.username)
                return callback({message:"Unknown error occured. Cannot access storage"},null);
            }
            return callback(null,response);
        }catch(e){
            return callback({message:"Unknown error occured, please try again", error:e},null);
        }
    });
}