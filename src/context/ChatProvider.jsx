import {createContext,useState,useEffect, useContext,useRef} from 'react'
import {io} from 'socket.io-client';

const ChatContext = createContext();

const ChatProvider = ({children})=>{
    const [chats, setChats] = useState();
    const [currentChat,setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [messages, setMessages] = useState([]);

    //const socket = useRef();
    const SocketConnect = io("http://localhost:5000");

    const userInfo = JSON.parse(localStorage.getItem("userdetails"));

    useEffect(() => {
        SocketConnect.on("recieve-message", (data) => {
          console.log(data)
          setReceivedMessage(data);
        });
    },[]);

    useEffect(()=>{
        if(sendMessage!==null){
            SocketConnect.emit("send-message", sendMessage);
        }
    },[sendMessage]);
    
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
            setMessages,
            SocketConnect
        }}>
            {children}
        </ChatContext.Provider>
    )

    
}

export const ChatState = () =>{
    return useContext(ChatContext);
}

export default ChatProvider;