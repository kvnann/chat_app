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
        if(!data.length){
            return false;
        }
        // const storedMessages = Object.values(JSON.parse(await AsyncStorage.getItem(STORAGE_ROUTES.loadedChats))).messages;
        // const newMessages = Object.values(JSON.parse(await AsyncStorage.getItem(STORAGE_ROUTES.loadedChats))).messages;
        // const messagesMap = new Map();

        // storedMessages.forEach(message => {
        //     messagesMap.set(message.messageID, message)
        // });

        const storedChats = await getLoadedChats();
        const chatsMap = new Map();


        storedChats.forEach(chat => {
            if(chat.chatID){
                chatsMap.set(chat.chatID, JSON.stringify(chat));
            }
        });

        data.forEach(chat => {
            if(chat.chatID){
                chatsMap.set(chat.chatID, chat);
            }
        });

        const finalChatsData = Array.from(chatsMap.values());
        await AsyncStorage.setItem(STORAGE_ROUTES.loadedChats, JSON.stringify(finalChatsData));
        return true;
    }catch(e){
        return null;
    }
}
export const saveNewMessages = async(data)=>{

}