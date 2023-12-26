import { 
    BellIcon, DevicesIcon, InteractionsIcon, MyPostsIcon, 
    CircleSquareIcon, LockIcon,GlobeIcon, LogoutIcon 
} from "../../assets/icons";

export default settings_components = [
    [
        {
          text:"My Posts",
          Icon:MyPostsIcon,
          shortInfo: "15",
          linkTo:"myposts",
          fill:"#C7334E",
          id:"1"
        },
        {
          text:"Recent Interactions",
          Icon:InteractionsIcon,
          shortInfo: null,
          linkTo:"recent_interactions",
          fill:"#5CA7D1",
          id:"2"
        },
        {
          text:"Devices",
          Icon:DevicesIcon,
          shortInfo: "1",
          linkTo:"devices",
          fill:"#54A14D",
          id:"3"
        }
      ],
      [
        {
          text:"Notifications",
          Icon:BellIcon,
          shortInfo: "On",
          linkTo:"notification_settings",
          fill:"#C7334E",
          id:"4"
        },
        {
          text:"Appearance",
          Icon:CircleSquareIcon,
          shortInfo: "",
          linkTo:"appearance_settings",
          fill:"#97439E",
          id:"5"
        },
        {
          text:"Privacy and Security",
          Icon:LockIcon,
          shortInfo: "",
          linkTo:"privacy_security_settings",
          fill:"#135FB8",
          id:"6"
        },
        {
          text:"Language",
          Icon:GlobeIcon,
          shortInfo: "English",
          linkTo:"language_settings",
          fill:"#C2C2C2",
          id:"7"
        },
      ],
      [
        {
          text:"Logout",
          Icon:LogoutIcon,
          shortInfo: "",
          linkTo:"logout",
          fill:"#C7334E",
          id:"8"
        },
      ]
]