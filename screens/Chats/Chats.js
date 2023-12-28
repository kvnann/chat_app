import React, {useState, useEffect} from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../assets'
import { optimizeHeight, optimizeWidth, colors } from '../../lib/helpers'
import { ChatsComponent } from '../components'
import { getAllSavedUsersData } from '../../lib/handlers'
import { getInitialData } from '../../lib/handlers/chats.handlers'
import { useNavigation } from '@react-navigation/native'


const Chats = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [allUsersData, setAllUsersData] = useState(null);
  const [loadedChatsData, setLoadedChatsData] = useState(null);
  const [loadedUsersData, setLoadedUsersData] = useState(null);
  const [authUserData, setAuthUserData] = useState(null);
  let initialDataFetched = false;
  let initialStorageFetched = false;
  

  useEffect(()=>{
    const savedUsersData = getAllSavedUsersData();
    setAllUsersData(savedUsersData);
  },[])

  const fetchInitialDataAsync = async()=>{
    if(initialDataFetched){
      return;
    }
    initialDataFetched = true;
    setLoading(true);

    await getInitialData(true, async(err,response)=>{
      if(err){
        setErrorMessage(err.message);
        return;
      }
      setLoadedChatsData(response.data.chatsData);
      setAuthUserData(response.data.userData);
      return;
    });
    setLoading(false);
    return;
  }

  const fetchInitialDataFromAsyncStorage = async()=>{
    if(initialStorageFetched){
      return;
    }
    initialStorageFetched = true;
    setLoading(true);

    await getInitialData(false, async(err,response)=>{
      if(err){
        setErrorMessage(err.message);
        return;
      }
      setLoadedChatsData(await response.data.chatsData);
      setAuthUserData(await response.data.userData);
      return;
    });
    return;
  }

  useEffect(() => {
    fetchInitialDataFromAsyncStorage();
    fetchInitialDataAsync();
  }, [])
  
  return (
    <SafeAreaView style={[styles.main.container , {
      backgroundColor:colors.PRIMARY_DARK,
      flex:1,
      border:"none"
    }]}>

        <View style={{
            marginTop:optimizeHeight(20),
            display:'flex',
            flexDirection:"row",
            justifyContent:"space-between",
            paddingLeft:optimizeWidth(28),
            paddingRight:optimizeWidth(18)
        }}>

          <TouchableOpacity>
           <Text style={[styles.main.textPrimary, styles.main.fs_18]}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity>
           <Text style={[styles.main.textPrimary, styles.main.fs_18]}>New Chat</Text> 
          </TouchableOpacity>

        </View>

        <View style={[{
          marginTop:optimizeHeight(20),
          paddingLeft:optimizeWidth(28),
        }]}>
          <Text style={[styles.main.textBold, styles.main.textWhite, styles.main.fs_40]}>
            Chats
          </Text>
        </View>

        <ChatsComponent allUsersData={allUsersData} chatsData={loadedChatsData} authUser={authUserData}/>

    </SafeAreaView>
  )
}

export default Chats