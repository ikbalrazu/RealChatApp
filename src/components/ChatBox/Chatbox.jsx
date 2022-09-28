import React, { useEffect,useState,useRef } from 'react'
import './Chatbox.css'
import axios from 'axios';
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const Chatbox = ({chat,currentUser,setSendMessage,receivedMessage}) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");


    //fetching data for header
    useEffect(()=>{
        // console.log(chat);
        // console.log(currentUser);
        const userId = chat?.members?.find((id)=>id!==currentUser);
        console.log(userId);
        const getUserData = async () => {
        try{
            const {data} =await axios.get(`/user/${userId}`)
            console.log(data);
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
            const { data } = await axios.get(`/message/${chat?._id}`)
            console.log(data);
            setMessages(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        if (chat !== null) fetchMessages();
    }, [chat]);

    //send message
    const handleSend = async() => {
        console.log(newMessage);
        const message = {
            senderId : currentUser,
            text: newMessage,
            chatId: chat._id,
        }
        const receiverId = chat.members.find((id)=>id!==currentUser);
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

    //Receive message from parent component
    useEffect(()=>{
        console.log("Message Arrived: ", receivedMessage);
        if(receivedMessage !== null && receivedMessage.chatId === chat?._id){
            setMessages([...messages, receivedMessage]);
        }
    },[receivedMessage]);

    const scroll = useRef();
    useEffect(()=>{
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    },[messages]);
    
  return (
    <>
    <div>
        {chat ? (
            <>
            <div className='chat-header'>
            <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" style={{ width: "50px", height: "50px" }}/>
            <p>{userData?.name}</p>
            <a><button>Info</button></a>
            </div>
            <hr
            style={{
                width: "95%",
                border: "0.01px solid #ececec",
                marginTop: "20px",
            }}
            />
            <div className="chat-body">
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
        ) : (
            <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
        
    </div>
    </>
  )
}

export default Chatbox