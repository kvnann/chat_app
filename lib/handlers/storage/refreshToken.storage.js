import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_ROUTES } from './';

export const getRefreshToken = async()=>{
    try{
        return await AsyncStorage.getItem(STORAGE_ROUTES.refreshToken);
    }catch(e){
        return null;
    }
}
export const saveRefreshToken = async(data)=>{
    try{
        await AsyncStorage.setItem(STORAGE_ROUTES.refreshToken, data);
        return true;
    }catch(e){
        return null;
    }
}