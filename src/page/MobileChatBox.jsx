import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChatState } from '../context/ChatProvider';
import axios from "axios";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { Box, Avatar, Typography,IconButton, MenuItem, Menu  } from '@mui/material';
import { Stack } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from "react-router-dom";
import {io} from 'socket.io-client';

const ITEM_HEIGHT = 48;

const MobileChatBox = () =>{
    const locatiion = useLocation();
    const dashboard = useNavigate();
    const socket = useRef();

    const userInfo = JSON.parse(localStorage.getItem("userdetails"));
    const currentUser = userInfo?.id;

    const {
        currentChat,
        setSendMessage,
        receivedMessage,
        setReceivedMessage,
        messages,
        setMessages,
        sendMessage
    } = ChatState();

    const [userData, setUserData] = useState(null);
    // const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //send message to socket server
    // const [sendMessage, setSendMessage] = useState(null);
    useEffect(()=>{
        if(sendMessage!==null){
        socket?.current?.emit("send-message", sendMessage);
        }
    },[sendMessage]);

    useEffect(() => {
        socket?.current?.on("recieve-message", (data) => {
          console.log(data)
          setReceivedMessage(data);
        });
    },[]);

    //fetching data for header
    useEffect(()=>{
        // console.log(chat);
        console.log(currentUser);
        const userId = currentChat?.members?.find((id)=>id!==currentUser);
        //console.log(chat?._id);
        const getUserData = async () => {
        try{
            const {data} =await axios.get(`/user/${userId}`)
            console.log(data);
            setUserData(data);
        }catch (error) {
            console.log(error);
        }
        };

        if (currentChat !== null) getUserData();
    },[currentChat]);

    //fetch messages
    useEffect(() => {
        const fetchMessages = async () => {
          try {
            const { data } = await axios.get(`/message/${currentChat?._id}`)
            console.log(data);
            setMessages(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        if (currentChat !== null) fetchMessages();
    }, [currentChat]);

    useEffect(()=>{
        console.log(receivedMessage);
    });

    //send message
    const handleSend = async() => {
        console.log(newMessage);
        const message = {
            senderId : currentUser,
            text: newMessage,
            chatId: currentChat._id,
        }
        const receiverId = currentChat.members.find((id)=>id!==currentUser);
        //send message to socket server
        setSendMessage({...message, receiverId})
        //send message to database
        try{
            const {data} = await axios.post("/message",message);
            setMessages([...messages,data]);
            setNewMessage("");

        }catch{
            console.log("error");
        }
        
    }

    //get the message from socket server
  // const [receivedMessage, setReceivedMessage] = useState(null);
    // useEffect(() => {
    //     socket?.current?.on("recieve-message", (data) => {
    //     console.log(data)
    //     setReceivedMessage(data);
    //     });
    // },[receivedMessage]);

    //Receive message from parent component
    useEffect(()=>{
        console.log("Message Arrived: ", receivedMessage);
        if(receivedMessage !== null && receivedMessage.chatId === currentChat?._id){
            setMessages([...messages, receivedMessage]);
        }
    },[receivedMessage]);

    const scroll = useRef();

    useEffect(()=>{
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    },[messages]);

    //Delete chat
    const DeleteChat = async() => {
        
        const data = await axios.get(`chat/delete/${currentChat?._id}`);
        console.log(data);
        const {userdata} = await axios.get(`/chat/${currentUser}`)
        console.log(userdata);
        // handleChat(userdata);
        setUserData(null);
        window.location.reload(false);
    }


    return(
        <>
    <Box bgcolor="skyblue" p={1} sx={{display:{xs:"block",sm:"none"}}}>
    <div style={{height:"1000%"}}>
            <>
            <Box>
                <Stack direction='row' spacing={1} justifyContent="start">
                <Link to='/chat'>
                <IconButton>
                <KeyboardBackspaceIcon/>
                </IconButton>
                </Link>
                <Avatar alt="Remy Sharp" src={userData?.picture} style={{ width: "50px", height: "50px" }}/>
                <Box >
                <Typography sx={{marginTop:"10px"}}>
                    {userData?.name}
                </Typography>
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
                <MenuItem>
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
            <div className="chat-body" style={{height:"60vh"}}>
            {messages.map((message)=>(
                <>
                <div ref={scroll} className={message.senderId === currentUser ? "message own" : "message"}>
                    <span>{message.text} </span>
                    <span>{format(message.createdAt)}</span>
                </div>
                
                </>
            ))}
            </div>
            <div className="chat-sender">
            {/* <textarea className='message-input' value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} type="textarea" placeholder='message'/> */}
            <InputEmoji
            value={newMessage}
            onChange={setNewMessage}
            />
            <div><button className='send-btn' onClick={handleSend}>Send</button></div>
            </div>
            </>
        
    </div>
    </Box>
    </>
    )
}
export default MobileChatBox;