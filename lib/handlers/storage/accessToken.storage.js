import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_ROUTES } from './';

export const getAccessToken = async()=>{
    try{
        return JSON.parse(await AsyncStorage.getItem(STORAGE_ROUTES.accessToken));
    }catch(e){
        return null;
    }
}
export const saveAccessToken = async(data)=>{
    try{
        await AsyncStorage.setItem(STORAGE_ROUTES.accessToken, data);
        return true;
    }catch(e){
        return null;
    }
}