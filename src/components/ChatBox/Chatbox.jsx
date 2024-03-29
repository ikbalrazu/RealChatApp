import React, { useEffect,useState,useRef } from 'react'
import './Chatbox.css'
import axios from 'axios';
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { Box, Avatar, Typography,IconButton, MenuItem, Menu, Button, CardMedia  } from '@mui/material';
import { Stack } from '@mui/system';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//for dialog box
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { ChatState } from '../../context/ChatProvider';

//message sound
import useSound from 'use-sound';
import sendmsgsound from '../../sound/sendmsg.mp3'

const ITEM_HEIGHT = 48;

const Chatbox = ({chat,currentUser,setSendMessage,receivedMessage,handleChat,online}) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState();

    const [typingMessage, setTypingMessage] = useState();

    const userInfo = JSON.parse(localStorage.getItem("userdetails"));

    const {
        SocketConnect
      } = ChatState();

    //message sound
    const [sendmsgPlay] = useSound(sendmsgsound);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const config = {
        headers:{
          Authorization: 'Bearer ' + userInfo?.token
        }
    };


    //fetching data for header
    useEffect(()=>{
        //console.log(chat);
        //console.log(currentUser);
        const userId = chat?.members?.find((id)=>id!==currentUser);
        //console.log(chat?._id);
        const getUserData = async () => {
        try{
            const {data} =await axios.get(`/user/${userId}`,config);
            //console.log(data);
            setUserData(data);
        }catch (error) {
            console.log(error);
        }
        };

        if (chat !== null) getUserData();
    },[chat]);

    //fetch messages
    useEffect(() => {
        const fetchMessages = async () => {
          try {
            const { data } = await axios.get(`/message/${chat?._id}`,config);
            //console.log(chat?._id);
            setMessages(data);
          } catch (error) {
            //console.log(error);
          }
        };
    
        if (chat !== null) fetchMessages();
    }, [chat]);

    //send message
    const handleSend = async() => {

        SocketConnect?.emit("typingMessage",{
            senderid: currentUser,
            receiverid: userData._id,
            msg: ""
        })

        //console.log(newMessage);
       
        try{

            if(newMessage){
                const message = {
                    senderId : currentUser,
                    text: newMessage,
                    chatId: chat._id,
                }
                sendmsgPlay();
                const receiverId = chat.members.find((id)=>id!==currentUser);
                //send message to socket server
                setSendMessage({...message, receiverId})
                //send message to database
                const {data} = await axios.post("/message",message);
                //console.log(data);
                setMessages([...messages,data]);
                setNewMessage("");
            }
            

        }catch{
            console.log("error");
        }
        
    }

    //Receive message from parent component
    useEffect(()=>{
        //console.log("Message Arrived: ", receivedMessage);
        if(receivedMessage !== null && receivedMessage.chatId === chat?._id){
            setMessages([...messages, receivedMessage]);
        }
    },[receivedMessage]);

    const scroll = useRef();
    useEffect(()=>{
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    },[messages]);


    //Delete chat
    const DeleteChat = async() => {
        
        const data = await axios.get(`chat/delete/${chat?._id}`,config);
        //console.log(data);
        const {userdata} = await axios.get(`/chat/${currentUser}`,config);
        //console.log(userdata);
        handleChat(userdata);
        setUserData(null);
        window.location.reload(false);


    }

    //Dialog Box for user profile
    const [userprofile, setUserProfile] = useState(false);

    const handleClickOpen = () => {
        setUserProfile(true);
    };

    const handleClickClose = () => {
        setUserProfile(false);
    };

    const handleChange = (e) => {
        setNewMessage(e?.target?.value);

        // console.log(userData._id);
        // console.log(currentUser);
        // console.log(e?.target?.value);
    
        SocketConnect?.emit("typingMessage",{
            senderid: currentUser,
            receiverid: userData._id,
            msg: e?.target?.value
        })
    }

    useEffect(()=>{
        SocketConnect.on("typingMessageGet",(data)=>{
            //console.log(data);
            setTypingMessage(data);
        })
    },[]);
    
  return (
    <>
    <Box bgcolor="skyblue" p={1} sx={{display:{xs:"none",sm:"block"}}}>
        {/* <Toaster 
        position={'top-right'} 
        reverseOrder={false}
        toastOptions = {{
            style : {
                fontSize: '18px'
            }
        }}
        /> */}
    <div style={{height:"1000%"}}>
        {chat ? (
            <>
            <Box 
            // sx={{border:"1px solid red"}}
            >
                <Stack direction='row' spacing={1} justifyContent="start">
                <Avatar alt="Remy Sharp" src={userData?.picture} style={{ width: "50px", height: "50px" }}/>
                <Box >
                <Typography sx={{marginTop:"6px"}}>
                    {userData?.name}
                </Typography>
                {typingMessage && typingMessage?.msg && typingMessage?.senderId === userData?._id ? 
                <Typography color={online ? "green" : "white"}  variant="caption" display="block" gutterBottom>typing..</Typography> 
                : 
                <Typography color={online ? "green" : "white"}  variant="caption" display="block" gutterBottom>{online ? "online" : "offline"}</Typography>}
                {/* <Typography color={online ? "green" : "white"}  variant="caption" display="block" gutterBottom>{online ? "online" : "offline"}</Typography> */}
                </Box>

                <Box sx={{flexGrow:0}}>
                <IconButton 
                aria-label="more"
                id="long-button"
                onClick={handleClick}
                >
                <MoreVertIcon/>
                </IconButton>
                <Menu
                id="long-menu"
                MenuListProps={{
                'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                },
                }}
                >
                <MenuItem onClick={handleClickOpen}>
                Profile
                </MenuItem>
                <MenuItem onClick={DeleteChat}>
                Delete Conversion
                </MenuItem>
                </Menu>
                </Box>
                </Stack>


            </Box>
            <hr
            style={{
                width: "95%",
                border: "0.01px solid #ececec",
                marginTop: "20px",
            }}
            />
            <div 
            className="chat-body" 
            style={{
                height:"60vh",
                // border:"1px solid green"
            }}
            >
            {messages.map((message,index)=>(
                <>
                <div ref={scroll} className={message.senderId === currentUser ? "message own" : "message"}>
                    <span>{message.text} </span>
                    <span>{format(message.createdAt)}</span>
                </div>
                
                </>
            ))}
            </div>
            
            <div className="chat-sender">
            {/* <textarea 
            className='message-input' 
            value={newMessage} 
            onChange={(e)=>handleChange(e)} 
            type="textarea" 
            placeholder='message'
            /> */}
            <input 
            className='message-input' 
            value={newMessage} 
            onChange={(e)=>handleChange(e)} 
            type="text" 
            placeholder='Message'
            />
            {/* <InputEmoji
            value={newMessage}
            onChange={setNewMessage}
            /> */}
            <div><button className='send-btn' onClick={handleSend}>Send</button></div>
            </div>
            </>
        ) : (
            <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
        
    </div>

    {/* profile dialog box start */}
    <Dialog open={userprofile} onClose={handleClickClose}>
        <DialogTitle>{userData?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {userData?.email}
          </DialogContentText>
          <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={userData?.picture}
              alt="green iguana"
            />
          </CardActionArea>
        </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* profile dialog box end */}
    </Box>
    </>
  )
}

export default Chatbox