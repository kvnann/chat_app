import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'
import { sendRequestAsync } from "../handlers";
import { setAuthUser, setLoadedChats, setLoadedUsers } from "./storage";

const BACKEND_ROUTES = {
    initial: "/users/initial"
}

export const getInitialData = async(callback)=>{
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
            if(!await setAuthUser(JSON.stringify(response.data.userData))){
                return callback({message:"Unknown error occured. Cannot access storage"},null);
            }
            if(!await setLoadedUsers(JSON.stringify(response.data.friendsData))){
                return callback({message:"Unknown error occured. Cannot access storage"},null);
            }
            if(!await setLoadedChats(JSON.stringify(response.data.chatsData))){
                return callback({message:"Unknown error occured. Cannot access storage"},null);
            }
            return callback(null,response);
        }catch(e){
            return callback({message:"Unknown error occured, please try again", error:e},null);
        }
    });
}