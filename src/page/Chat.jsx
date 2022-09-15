import React,{useState,useEffect,useRef} from 'react'
import './Chat.css';
import Conversation from '../components/Conversion/Conversation';
import Chatbox from '../components/ChatBox/Chatbox';
import SearchAndAdd from '../components/SearchAndAdd/SearchAndAdd';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {io} from 'socket.io-client';


const Chat = () => {
  const loginpage = useNavigate();
  const socket = useRef();
  const [chats, setChats] = useState();
  const [chatMemberId,setChatMemberId] = useState([]);
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
        // for(let i=0; i<data?.length; i++){
        //   const chatmembers = data[i].members.find((member) => member !== userInfo?.id);
        //   setChatMemberId(oldData => [...oldData,chatmembers]);
        //   mymembers.push(chatmembers);
        // }
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
    let mymembers=[];
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
    <div className='container'>
      <div><button onClick={LogoutHandler}>Logout</button></div>
      <div className="conversion">
      <SearchAndAdd members={myChatMembers(chats)}/>
      <p>Chat List</p>
      {chats?.map((chat)=>(
        <div onClick={()=>setCurrentChat(chat)}>
          <Conversation 
          data={chat} 
          currentUserId={userInfo?.id}
          online={checkOnlineStatus(chat)}
          />
        </div>
      ))}
      
      </div>
      <div className="chatbox">
      <Chatbox 
      chat={currentChat} 
      currentUser={userInfo?.id}
      setSendMessage={setSendMessage}
      receivedMessage={receivedMessage} 
      />
      </div>
    </div>
  )
}

export default Chat