import {createContext,useState,useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({children})=>{
    const [chats, setChats] = useState();
    const [currentChat,setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    
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
            setReceivedMessage
        }}>
            {children}
        </ChatContext.Provider>
    )

    
}

export const ChatState = () =>{
    return useContext(ChatContext);
}

export default ChatProvider;