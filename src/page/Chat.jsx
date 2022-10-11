import React,{useState,useEffect,useRef} from 'react'
// import './Chat.css';
import Conversation from '../components/Conversion/Conversation';
import Chatbox from '../components/ChatBox/Chatbox';
import SearchAndAdd from '../components/SearchAndAdd/SearchAndAdd';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {io} from 'socket.io-client';
import {Box,AppBar,styled,Paper,Stack,Menu,MenuItem,ListItemIcon,Divider,IconButton,Typography,Tooltip, List, ListItem, ListItemButton } from '@mui/material';
import {PersonAdd,Settings,Logout} from '@mui/icons-material';
import NavBar from '../components/Navbar/NavBar';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Chat = () => {
  const loginpage = useNavigate();
  const socket = useRef();
  const [chats, setChats] = useState();
  const [chatMemberId,setChatMemberId] = useState([]);
  const [currentChat,setCurrentChat] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userdetails"));
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const LogoutHandler = () =>{
    localStorage.removeItem("userdetails");
    loginpage("/")
  }

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
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(()=>{
    socket.current = io("http://localhost:5000");
    socket.current.emit("new-user-add", userInfo?.id);
    socket.current.on("get-users",(users)=>{
      setOnlineUsers(users);
    })
    // socket.on("message", function(data){
    //   console.log(data);
    //   document.getElementById("msg").innerHTML=data;
    // });

    // socket.on("myevent",function(data){
    //   console.log(data);
    // })

    // socket.emit("myevent","hi iqbal");

  },[]);

  //send message to socket server
  const [sendMessage, setSendMessage] = useState(null);
  useEffect(()=>{
    if(sendMessage!==null){
      socket.current.emit("send-message", sendMessage);
    }
  },[sendMessage]);

  //get the message from socket server
  const [receivedMessage, setReceivedMessage] = useState(null);
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    });
  },[]);

  //online status online/offline
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== userInfo?.id);
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
     <NavBar/>
      {/* navbar */}
      <Stack direction="row" spacing={1} justifyContent="center">
      <Box bgcolor="#fff" sx={{height:"auto"}}>
      <Stack direction="column" justifyContent="center" p={1}>
      
      <SearchAndAdd currentUser={userInfo?.id} handleChat={(value)=>setChats(value)}  members={myChatMembers(chats)}/>
      <Box bgcolor="#F5F5F5" sx={{height:'75vh'}}>
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
      
      </Stack>
      </Box>

      <Box bgcolor="yellow" sx={{display:{xs:"none", sm:"block"},width:"65%",height:"90vh"}}>
      <Chatbox 
      chat={currentChat} 
      currentUser={userInfo?.id}
      setSendMessage={setSendMessage}
      receivedMessage={receivedMessage} 
      handleChat={(value)=>setChats(value)}
      />
      </Box>

      </Stack>
      </Box>
      </>
    
    // old design
    // <div className='container'>
    //   <div><button onClick={LogoutHandler}>Logout</button></div>
    //   <div className="conversion">
    //   <SearchAndAdd currentUser={userInfo?.id} handleChat={(value)=>setChats(value)}  members={myChatMembers(chats)}/>
    //   <p>Chat List</p>
    //   {chats?.map((chat)=>(
    //     <div onClick={()=>setCurrentChat(chat)}>
    //       <Conversation 
    //       data={chat} 
    //       currentUserId={userInfo?.id}
    //       online={checkOnlineStatus(chat)}
    //       />
    //     </div>
    //   ))}
      
    //   </div>
    //   <div className="chatbox">
    //   <Chatbox 
    //   chat={currentChat} 
    //   currentUser={userInfo?.id}
    //   setSendMessage={setSendMessage}
    //   receivedMessage={receivedMessage} 
    //   handleChat={(value)=>setChats(value)}
    //   />
    //   </div>
    // </div>
  )
}

export default Chat