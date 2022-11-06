import {createContext,useState,useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({children})=>{
    const [chats, setChats] = useState();
    const [currentChat,setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    
    return(
        <ChatContext.Provider value={{
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
            messages,
            setMessages
        }}>
            {children}
        </ChatContext.Provider>
    )

    
}

export const ChatState = () =>{
    return useContext(ChatContext);
}

export default ChatProvider;