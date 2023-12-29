import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native'
import chat_data from "./data/chat_data";
import savedUserData from "./data/savedUserData";
import { useEffect } from "react";

const MESSAGE_SEPERATION_MINUTES = 5

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const optimizeHeight = (height)=>{
    return (screenHeight/932)*height
}
export const optimizeWidth = (width)=>{
    return (screenWidth/430)*width
}
export const getScreenDimensions = ()=>{
    return({x:screenWidth, y:screenHeight});
}

export const createDataURI = (base64String)=>{
    if(!base64String){
        return null
    }
    const imageType = base64String.startsWith('/9j/') ? 'image/jpeg' : 'image/png';
    const dataURI = `data:${imageType};base64,${base64String}`;
    return dataURI;
}

export const colors = {
    PRIMARY_DARK:"#02090B",
    PRIMARY_TEXT:"#5CA7D1",
    MUTED:"#697D88",
    MUTED_LIGHT:"#2E5B74",
    MUTED_DARK:"#829CAB",
    WHITE:"#FFFFFF",
    PRIMARY_LIGHT:"#07131A",
    PRIMARY_MUTED:"#102C3C",
    PRIMARY_EXTRALIGHT:"#172D38",
    DANGER:"#C7334E"
};

export function areSameDay (date1, date2) {
    date1 = new Date(date1)
    date2 = new Date(date2)
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

export const isYesterday = (dateString) => {
    if(!dateString){
        return false;
    }
    dateString = new Date(dateString).toISOString();
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    return dateString?.split('T')[0] === yesterday;
};
export const isToday = (dateString) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
};

export const getDatePreview = (dateString)=>{
    if (isYesterday(dateString)) {
        return 'Yesterday';
    } else if (isToday(dateString)) {
        const now = new Date();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        return `${mm}:${dd}`;
    } else {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            return `${dd}/${mm}/${yyyy}`;
        } else {
            return 'Invalid date';
        }
    }
}

export const formatTime = (milliseconds)=>{
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    const formattedHours = hours > 0 ? hours + ':' : '';
    const formattedMinutes = (minutes % 60).toString().padStart(2, '0') + ':';
    const formattedSeconds = (seconds % 60).toString().padStart(2, '0');
  
    return formattedHours + formattedMinutes + formattedSeconds;
}

export const sortArrayByTime = (array) => {
    if(!(array?.length > 0)){
        return;
    }
    let messageArray = !Array.isArray(array) ? Object.values(array) : array;
    //messageArray = messageArray.filter(message => message.type !== 3);
    
    
    messageArray.sort((a, b) => {
        const timeA = new Date(a.timeSent);
        const timeB = new Date(b.timeSent);
        return timeA - timeB;
    });
    
    return messageArray;
}

export const getHoursAndMinutes = (dateString)=>{
    const hours = new Date(dateString).getHours().toString().padStart(2, '0'); // Ensure two digits with leading zero if needed
    const minutes = new Date(dateString).getMinutes().toString().padStart(2, '0'); // Ensure two digits with leading zero if needed
    return `${hours}:${minutes}`
}

export const formatDateToString = (dateString, short) => {
    if(!dateString){
        return false
    }
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return short ? `${day}/${month+1}/${year}` : `${day} ${months[month]} ${year}`;
}

function addDateSeperators (array) {
    if(!(array?.length > 0)){
        return;
    }
    let messageArray = !Array.isArray(array) ? Object.values(array) : array;

    let objectsToAdd = [];

    for (let i = 0; i < messageArray.length; i++) {
        const messageTime = messageArray[i]?.timeSent;
        const prevMessageTime = messageArray[i-1]?.timeSent;

        if(!areSameDay(messageTime, prevMessageTime) && messageArray[i]?.type !== 3){
            const seperatorObject = {
                index:i,
                time:new Date(messageTime),
                text: areSameDay(messageTime, new Date()) ? "Today" : isYesterday(messageTime) ? "Yesterday" : formatDateToString(messageTime),
                type:3
            }
            if(formatDateToString(messageArray[i-1]?.timeSent) != formatDateToString(messageTime) && messageArray[i-1]?.text != (areSameDay(messageTime, new Date()) ? "Today" : isYesterday(messageTime) ? "Yesterday" : formatDateToString(messageTime))){
                objectsToAdd.push(seperatorObject);
            }
        }
        
    }

    let count = 0;

    objectsToAdd.forEach(objectToAdd=>{
        messageArray.splice(objectToAdd.index + count, 0, objectToAdd);
        count++
    });

    return messageArray;
}

function groupMessages (array) {
    if(!(array?.length > 0)){
        return;
    }
    let messageArray = !Array.isArray(array) ? Object.values(array) : array;
    //messageArray = messageArray.filter(message => message.type !== 3);
    for(let i=0; i<messageArray.length; i++){

        if(messageArray[i].type === 3){
            continue;
        }

        let existsInARow = 
            (
                areSameDay(messageArray[i]?.timeSent, messageArray[i+1]?.timeSent)
                ||
                (messageArray[i].type !== 3 && areSameDay(messageArray[i]?.timeSent, messageArray[i-1]?.timeSent))
            ) 
            &&
            (
                Math.abs((new Date(messageArray[i+1]?.timeSent)).getTime() - (new Date(messageArray[i]?.timeSent)).getTime()) <= (MESSAGE_SEPERATION_MINUTES * 60 * 1000)
                ||
                Math.abs((new Date(messageArray[i-1]?.timeSent)).getTime() - (new Date(messageArray[i]?.timeSent)).getTime()) <= (MESSAGE_SEPERATION_MINUTES * 60 * 1000)
            )
            &&
            (messageArray[i]?.sentBy === messageArray[i+1]?.sentBy || messageArray[i]?.sentBy === messageArray[i-1]?.sentBy);
        
        let notTheLastOne = areSameDay(messageArray[i]?.timeSent, messageArray[i+1]?.timeSent) && // no profile photo will be displayed if the message exists in a row
            Math.abs((new Date(messageArray[i+1]?.timeSent)).getTime() - (new Date(messageArray[i]?.timeSent)).getTime()) <= (MESSAGE_SEPERATION_MINUTES * 60 * 1000)
            &&
            messageArray[i]?.sentBy === messageArray[i+1]?.sentBy;

        let notTheFirstOne = (areSameDay(messageArray[i]?.timeSent, messageArray[i-1]?.timeSent)) && // no profile photo will be displayed if the message exists in a row
            Math.abs((new Date(messageArray[i-1]?.timeSent)).getTime() - (new Date(messageArray[i]?.timeSent)).getTime()) <= (MESSAGE_SEPERATION_MINUTES * 60 * 1000)
            &&
            messageArray[i]?.sentBy === messageArray[i-1]?.sentBy;

        messageArray[i].firstInTheRow = existsInARow && !notTheFirstOne && notTheLastOne
        messageArray[i].lastInTheRow = existsInARow && notTheFirstOne && !notTheLastOne
        messageArray[i].existsInARow = existsInARow;
        
    }
    return messageArray;
}

export const lastSeenString = (dateString) => {
    const date = new Date(dateString);

    return `${
        areSameDay(new Date(), date) ? "" : isYesterday(date) ? "yesterday " : formatDateToString(date,true) + " "
    }at ${
        getHoursAndMinutes(date)
    }`
}

export const openChat = (chatID, navigation) => {
    navigation.navigate("chat", {
        chatID
    });
}


export const createRandomString = (length)=>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    result += characters.charAt(Math.floor(Math.random() * (characters.length - 10)));
    
    for (let i = 1; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    
    return result;
}

export const messageParsing = (messages) => {
    messages = sortArrayByTime(messages);
    messages = groupMessages(messages);
    messages = addDateSeperators(messages)
    return messages;
}