import {StyleSheet, StatusBar} from 'react-native'
import { colors, optimizeHeight, optimizeWidth } from '../../lib/helpers';

const main = StyleSheet.create({
    container: {
      marginTop:StatusBar.currentHeight,
    },
    containerCovered:{
      paddingTop:StatusBar.currentHeight,
    },
    textPrimary:{
      color: colors.PRIMARY_TEXT
    },
    fs_18:{
      fontSize:optimizeWidth(18)
    },
    fs_20:{
      fontSize:optimizeWidth(20)
    },
    fs_40:{
      fontSize:optimizeWidth(40)
    },
    textWhite:{
      color:colors.WHITE
    },
    textBold:{
      fontWeight:700
    },
    textSemiBold:{
      fontWeight:500
    },  
    textMuted:{
      color:colors.MUTED
    },
    input:{
      backgroundColor:colors.PRIMARY_LIGHT,
      paddingVertical:optimizeHeight(3),
      paddingHorizontal:optimizeWidth(10),
      color:colors.WHITE,
      borderRadius:15,
      width:optimizeWidth(257),
      height:optimizeHeight(39),
      textAlign:'center'
    }
});

const chats = {
  chat:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    width:"100%",
    marginTop:optimizeHeight(10),
    paddingBottom:optimizeHeight(10)
  }
}

const explore = {
  searchInput:{
    textAlign:"left",
    color:colors.WHITE,
    fontSize:optimizeWidth(18)
  }
}

const styles = {
  main,
  chats,
  explore
}

export default styles