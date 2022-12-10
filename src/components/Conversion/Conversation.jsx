import { Box, Stack, Avatar, Badge, Typography } from '@mui/material';
import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { ChatState } from '../../context/ChatProvider';


const Conversation = ({data,currentUserId,online}) => {
  const [userData,setUserData] = useState([]);
  //let userData = [];

  const [unseenmsg,setUnseenMsg] = useState();

  const {receivedMessage} = ChatState();
  
  // console.log(receivedMessage?.text);
  // console.log(receivedMessage?.receiverId);

  useEffect(()=>{
    const userId = data?.members?.find((id)=>id!==currentUserId);
    //console.log(userId);
    if(receivedMessage?.receiverId === userId){
      setUnseenMsg(receivedMessage?.text)
    }
    const getUserData = async ()=> {
      try
      {
        const {data} =await axios.get(`/user/${userId}`)
        //console.log(data);
        setUserData(data)
      }
      catch(error)
      {
        console.log(error)
      }
    }

    getUserData();
    
  },[])

  //fetch messages
//   const [message,setMessages] = useState();
//   useEffect(() => {
//     const userId = data?.members?.find((id)=>id!==currentUserId);
//     const fetchMessages = async () => {
//       try {
//         const { data } = await axios.get(`/message/${userId}`)
//         console.log(data);
//         setMessages(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     if (userId !== null) fetchMessages();
// }, []);

  return (
    <Box sx={{marginLeft:"10px"}} onClick={()=>console.log("conversion")}>
      <Stack direction="row" spacing={3}>
      <Badge color={online?"success":"default"} overlap="circular" badgeContent=" " variant="dot">
      <Avatar alt="Remy Sharp" src={userData?.picture} style={{ width: "50px", height: "50px" }}/>
      </Badge>

      <Stack>
      <Typography style={{fontSize:"20px"}}>{userData?.name}</Typography>
      <Typography sx={{fontSize:"12px"}}>{unseenmsg}</Typography>
      </Stack>
      
      </Stack>
    </Box>
  )
}

export default Conversation