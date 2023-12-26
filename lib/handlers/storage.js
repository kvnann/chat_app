import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_ROUTES = {
    authUser: 'authUserData',
    loadedUsers: 'loadedUsersData',
    loadedChats: 'loadedChatsData',
    accessToken: 'authorization',
    refreshToken: 'refreshToken'
}

export const getAuthUser = async()=>{
    try{
        return JSON.parse(await AsyncStorage.getItem(STORAGE_ROUTES.authUser));
    }catch(e){
        return null;
    }
}
export const setAuthUser = async(data)=>{
    try{
        await AsyncStorage.setItem(STORAGE_ROUTES.authUser, data);
        return true;
    }catch(e){
        return null;
    }
}
export const getLoadedUsers = async()=>{
    try{
        return JSON.parse(await AsyncStorage.getItem(STORAGE_ROUTES.loadedUsers));
    }catch(e){
        return null;
    }
}
export const getOneLoadedUser = async(username)=>{
    try{
        const usersData = JSON.parse(await AsyncStorage.getItem(STORAGE_ROUTES.loadedUsers));
        if(usersData){
            return usersData.find(u=>u.username === username);
        }
        return {};
    }catch(e){
        return null;
    }
}
export const setLoadedUsers = async(data)=>{
    try{
        await AsyncStorage.setItem(STORAGE_ROUTES.loadedUsers, data);
        return true;
    }catch(e){
        return null;
    }
}
export const getLoadedChats = async()=>{
    try{
        return JSON.parse(await AsyncStorage.getItem(STORAGE_ROUTES.loadedChats));
    }catch(e){
        return null;
    }
}
export const setLoadedChats = async(data)=>{
    try{
        await AsyncStorage.setItem(STORAGE_ROUTES.loadedChats, data);
        return true;
    }catch(e){
        return null;
    }
}
export const getAccessToken = async()=>{
    try{
        return JSON.parse(await AsyncStorage.getItem(STORAGE_ROUTES.accessToken));
    }catch(e){
        return null;
    }
}
export const setAccessToken = async(data)=>{
    try{
        await AsyncStorage.setItem(STORAGE_ROUTES.accessToken, data);
        return true;
    }catch(e){
        console.log(e)
        return null;
    }
}
export const getRefreshToken = async()=>{
    try{
        return JSON.parse(await AsyncStorage.getItem(STORAGE_ROUTES.refreshToken));
    }catch(e){
        return null;
    }
}
export const setRefreshToken = async(data)=>{
    try{
        await AsyncStorage.setItem(STORAGE_ROUTES.refreshToken, data);
        return true;
    }catch(e){
        return null;
    }
}