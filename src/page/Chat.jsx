import React,{useState,useEffect,useRef} from 'react'
// import './Chat.css';
import Conversation from '../components/Conversion/Conversation';
import Chatbox from '../components/ChatBox/Chatbox';
import SearchAndAdd from '../components/SearchAndAdd/SearchAndAdd';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {io} from 'socket.io-client';
import {Box,styled,Paper,Stack,List, ListItem, ListItemButton } from '@mui/material';
import NavBar from '../components/Navbar/NavBar';
import { ChatState } from '../context/ChatProvider';

import toast,{Toaster} from 'react-hot-toast';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Chat = () => {
  const loginpage = useNavigate();
  const chatboxpage = useNavigate();
  const socket = useRef();
  const {
    chats,
    setChats,
    currentChat,
    setCurrentChat,
    onlineUsers,
    setOnlineUsers,
    sendMessage,
    setSendMessage,
    receivedMessage,
    setReceivedMessage,
    SocketConnect,
  } = ChatState();
  // const [chats, setChats] = useState();
  const [chatMemberId,setChatMemberId] = useState([]);
  // const [currentChat,setCurrentChat] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userdetails"));
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
 


  useEffect(()=>{
    const getChats = async()=>{
      try{
        // console.log(user._id);
        const {data} = await axios.get(`/chat/${userInfo?.id}`)
        console.log("user chat data:",data);
        setChats(data);
        

      }catch(error){
        console.log(error);
      }
    }
    getChats();
  },[]);

  //socket io section
  // const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(()=>{
    socket.current = SocketConnect;
    //socket.current = io("https://realchatapp-api.onrender.com");
    socket.current.emit("new-user-add", userInfo?.id);
    socket.current.on("get-users",(users)=>{
      setOnlineUsers(users);
    })

  },[]);

  //send message to socket server
  // const [sendMessage, setSendMessage] = useState(null);
  // useEffect(()=>{
  //   if(sendMessage!==null){
  //     socket.current.emit("send-message", sendMessage);
  //   }
  // },[sendMessage]);

  //get the message from socket server
  // const [receivedMessage, setReceivedMessage] = useState(null);
  // useEffect(() => {
  //   socket.current.on("recieve-message", (data) => {
  //     console.log(data)
  //     setReceivedMessage(data);
  //   });
  // },[]);

  useEffect(()=>{
    console.log(userInfo?.token);
    if(!userInfo || !userInfo.token){
      loginpage('/');
    }
  },[])

  useEffect(()=>{

    // if(receivedMessage?.receiverId === userInfo.id && receivedMessage.senderId === curre ){
      
    // }

  },[]);

  //online status online/offline
  const checkOnlineStatus = (chat) => {
    const chatMember = chat?.members?.find((member) => member !== userInfo?.id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  const myChatMembers = (chatmembers) => {
    let mymembers=[userInfo?.id];
    if(chatmembers){
      for(let i=0; i<chatmembers?.length; i++){
        const chatmember = chatmembers[i].members.find((member) => member !== userInfo?.id);
        // setChatMemberId(oldData => [...oldData,chatmembers]);
        mymembers.push(chatmember);
      }
      return mymembers;
    }
  }
  

  return (
    <>
    <Box>
    <Toaster 
        position={'top-right'} 
        reverseOrder={false}
        toastOptions = {{
            style : {
                fontSize: '18px'
            }
        }}
    />
     <NavBar/>
      {/* navbar */}
      <Stack direction="row" spacing={1} justifyContent="center">
      <Box bgcolor="#fff" sx={{height:"auto"}}>
      <Stack direction="column" justifyContent="center" p={1}>
      
      <SearchAndAdd currentUser={userInfo?.id} handleChat={(value)=>setChats(value)}  members={myChatMembers(chats)}/>
      <Box bgcolor="#F5F5F5" sx={{height:'75vh',overflow:"scroll",overflowX:"hidden",display:{xs:"none",sm:"block"}}}>
        <List>
        {chats?.map((chat)=>(
          <ListItem>
          <ListItemButton onClick={()=>setCurrentChat(chat)}>
          <Conversation 
          data={chat} 
          currentUserId={userInfo?.id} 
          online={checkOnlineStatus(chat)}
          />
          </ListItemButton>
          </ListItem>
        ))}
        </List>
      </Box>

      {/* mobile chat */}
      <Box bgcolor="#F5F5F5" sx={{height:'75vh',overflow:"scroll",OverflowX:"hidden",display:{xs:"block",sm:"none"}}}>
        <List>
        {chats?.map((chat)=>(
          <ListItem onClick={()=>chatboxpage('/mobilechatbox')}>
          <ListItemButton onClick={()=>setCurrentChat(chat)}>
          <Conversation 
          data={chat} 
          currentUserId={userInfo?.id} 
          online={checkOnlineStatus(chat)}
          />
          </ListItemButton>
          </ListItem>
        ))}
        </List>
      </Box>
      
      </Stack>
      </Box>

      <Box bgcolor="aliceblue" sx={{display:{xs:"none", sm:"block"},width:"65%",height:"80vh"}}>
      <Chatbox 
      chat={currentChat} 
      currentUser={userInfo?.id}
      setSendMessage={setSendMessage}
      receivedMessage={receivedMessage} 
      handleChat={(value)=>setChats(value)}
      online={checkOnlineStatus(currentChat)}
      />
      </Box>

      </Stack>
      </Box>
      </>
  )
}

export default Chat