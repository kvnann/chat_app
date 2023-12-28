import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_ROUTES } from './';

export const getAuthUser = async()=>{
    try{
        return JSON.parse(await AsyncStorage.getItem(STORAGE_ROUTES.authUser));
    }catch(e){
        return null;
    }
}
export const saveAuthUser = async(data)=>{
    try{
        await AsyncStorage.setItem(STORAGE_ROUTES.authUser, JSON.stringify(data));
        return true;
    }catch(e){
        return null;
    }
}
export const updateAuthUser = async(data)=>{
    try{
        let userData = await getAuthUser();
        if(!userData || !data){
            return null;
        }
        userData = {...userData, ...data}
        await AsyncStorage.setItem(STORAGE_ROUTES.authUser, JSON.stringify(userData));
        return true;
    }catch(e){
        return null;
    }
}