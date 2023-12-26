// import pp from "../../assets/base64/pp";
import ppNushy from "../../assets/base64/ppNushy";
import ppAtlas from "../../assets/base64/ppAtlas";
import ppSofi from "../../assets/base64/ppSofi";

export default allSavedUsersData = [
    // {
    //   name:"Kanan Abdullayev",
    //   userID:"USERKANAN",
    //   time:"13:17",
    //   tag:"@kvnann",
    //   lastSeen:"10m ago",
    //   pp:pp,
    //   friends:false,
    //   asked:true,
    //   preview:{
    //     recieved:false,
    //     text:"What are you working on?",
    //     sentByMe:false,
    //     status:"unread"
    //   }
    // },
    {
      name:"Nushaba Guliyeva",
      userID:"USERNUSHY",
      time:"Yesterday",
      tag:"@Nushy",
      lastSeen:"2023-11-2T01:23:16.871Z",
      pp:ppNushy,
      friends:false,
      asked:false,
      preview:{
        recieved:false,
        sentByMe:true,
        text:"I have sent an email about it",
        status:"delivered"
      }
    },
    {
      name:"Atlas",
      userID:"USERATLAS",
      time:"Yesterday",
      tag:"@atlas_warrior",
      lastSeen:"2023-11-27T01:23:16.871Z",
      pp:ppAtlas,
      friends:true,
      asked:false,
      preview:{
        recieved:false,
        sentByMe:false,
        text:"I am planning to come today",
        status:"read"
      }
    },
    {
      name:"Sofi",
      userID:"USERSOFI",
      time:"Yesterday",
      tag:"@sophie_the_star",
      lastSeen:"2023-11-27T01:23:16.871Z",
      pp:ppSofi,
      friends:false,
      asked:false,
      preview:{
        recieved:false,
        sentByMe:true,
        text:"When are you planning to give my toy back Sofi :D",
        status:"seen"
      }
    },
]