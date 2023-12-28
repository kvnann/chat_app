import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_ROUTES } from './';

export const getLoadedChats = async()=>{
    try{
        return JSON.parse(await AsyncStorage.getItem(STORAGE_ROUTES.loadedChats));
    }catch(e){
        return null;
    }
}
export const getOneLoadedChat = async(chatID)=>{
    try{
        const chatsData = JSON.parse(await AsyncStorage.getItem(STORAGE_ROUTES.loadedChats));
        if(chatsData){
            return chatsData.find(c=>c.chatID === chatID);
        }
        return {};
    }catch(e){
        return null;
    }
}
export const saveLoadedChats = async(data)=>{
    try{
        await AsyncStorage.setItem(STORAGE_ROUTES.loadedChats, JSON.stringify(data));
        return true;
    }catch(e){
        return null;
    }
}