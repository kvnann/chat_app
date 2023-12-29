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
        if(!data){
            return false;
        }
        const storedUsers = await getLoadedUsers();
        const usersMap = new Map();

        storedUsers.forEach(user => {
            usersMap.set(user.userID, user);      
        });

        data.forEach(user => {
            usersMap.set(user.userID, user);      
        });

        const finalUsersData = Array.from(usersMap.values());

        await AsyncStorage.setItem(STORAGE_ROUTES.loadedUsers, JSON.stringify(finalUsersData));
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