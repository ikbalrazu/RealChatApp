import React, { useEffect,useState } from 'react'
import './Chatbox.css'
import axios from 'axios';

const Chatbox = ({chat,currentUser}) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const handleSend = async() => {
        console.log(newMessage);
        const message = {
            senderId : currentUser,
            text: newMessage,
            chatId: chat._id,
        }
        const {data} = await axios.post("/message",message);
        setMessages([...messages,data]);
        setNewMessage("");
    }

    useEffect(()=>{
        console.log(chat);
        console.log(currentUser);
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

    useEffect(()=>{

    },[]);

  return (
    <div>
        <div className='chat-header'>
        <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" style={{ width: "50px", height: "50px" }}/>
        <p>{userData?.name}</p>
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
            <div>
                <span>{message.text}</span>
            </div>
            </>
        ))}
        </div>
        <div className="chat-sender">
        <textarea className='message-input' value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} type="textarea" placeholder='message'/>
        <div><button className='send-btn' onClick={handleSend}>Send</button></div>
        </div>
    </div>
  )
}

export default Chatbox