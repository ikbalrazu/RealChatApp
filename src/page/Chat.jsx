import React,{useState,useEffect} from 'react'
import './Chat.css';
import Conversation from '../components/Conversion/Conversation';
import Chatbox from '../components/ChatBox/Chatbox';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

let socket;

const Chat = () => {
  const loginpage = useNavigate();
  const [chats, setChats] = useState();
  const [userid,setUserId] = useState([]);
  const [currentChat,setCurrentChat] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userdetails"));

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
  
  useEffect(()=>{
    socket = io.connect("http://localhost:5000");
    socket.on("message", function(data){
      console.log(data);
      document.getElementById("msg").innerHTML=data;
    });
  },[]);

  

  return (
    <div className='container'>
      <p id='msg'></p>
      <div><button onClick={LogoutHandler}>Logout</button></div>
      <div className="conversion">
      <h1>Chat List</h1>
      {chats?.map((chat)=>(
        <div onClick={()=>setCurrentChat(chat)}>
          <Conversation data={chat} userid={userid} currentUserId={userInfo?.id}/>
        </div>
      ))}
      
      </div>
      <div className="chatbox">
      <Chatbox chat={currentChat} currentUser={userInfo?.id} />
      </div>
    </div>
  )
}

export default Chat