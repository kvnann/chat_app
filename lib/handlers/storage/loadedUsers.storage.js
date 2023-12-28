import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_ROUTES } from './';

export const getLoadedUsers = async()=>{
    try{
        return JSON.parse(await AsyncStorage.getItem(STORAGE_ROUTES.loadedUsers));
    }catch(e){
        return null;
    }
}
export const getOneLoadedUser = async(username)=>{
    try{
        const userData = JSON.parse(await AsyncStorage.getItem(STORAGE_ROUTES.loadedUsers));
        if(userData){
            return userData.find(u=>u.username === username);
        }
        return {};
    }catch(e){
        return null;
    }
}
export const saveLoadedUsers = async(data)=>{
    try{
        await AsyncStorage.setItem(STORAGE_ROUTES.loadedUsers, JSON.stringify(data));
        return true;
    }catch(e){
        return null;
    }
}

export const updateLoadedUserData = async(username, data)=>{
    try{
        let usersData = JSON.parse(await AsyncStorage.getItem(STORAGE_ROUTES.loadedUsers));
        let userData = usersData.find(u=>u.username === username);
        if(!userData || !data){
            return null;
        }
        userData = {...userData, ...data}
        const usersDataUserRemoved = usersData?.filter(u=>u.username !== username);
        const usersDataUserAdded = [...usersDataUserRemoved, userData];
        await AsyncStorage.setItem(STORAGE_ROUTES.loadedUsers, JSON.stringify(usersDataUserAdded));
        return true;
    }catch(e){
        return null;
    }
}