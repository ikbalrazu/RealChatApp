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

    //typing message show
    const [senderid,setSenderId] = useState();
    const [receiverid,setReceiverId] = useState();
    const [msg,setMSG] = useState();


    //const socket = useRef();
    //const SocketConnect = io("http://localhost:5000");
    const SocketConnect = io("https://realchatapp-api.onrender.com");

    const userInfo = JSON.parse(localStorage.getItem("userdetails"));

    useEffect(() => {
        SocketConnect.on("recieve-message", (data) => {
          //console.log(data)
          setReceivedMessage(data);
        });

        // SocketConnect.emit("typingMessage",{
        //     //senderid: id,
        //     //receiverid: currentfriend._id
        //     //msg: ""
        // })
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
            SocketConnect,
            setSenderId,
            setReceiverId,
            setMSG
        }}>
            {children}
        </ChatContext.Provider>
    )

    
}

export const ChatState = () =>{
    return useContext(ChatContext);
}

export default ChatProvider;