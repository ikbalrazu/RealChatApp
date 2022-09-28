const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');

//route
const UserRoute = require('./Routes/userRoute');
const ChatRoute = require('./Routes/chatRoute');
const MessageRoute = require('./routes/messageRoute'); 
const { Socket } = require("socket.io");

dotenv.config();
const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

app.use(cors());

const PORT = process.env.PORT || 4000

//connect with mongodb
const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit();
    }
}

app.get("/",(req,res)=>{
    res.send("Real Chat App By Iqbal");
})


app.use('/user', UserRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);

const server = app.listen(PORT,function(error){
    if(error){
        console.log("server failed");
    }else{
        console.log("server success");
        connectDB();
    }
})

//implement socket io
const io=require('socket.io')(server,{
    cors:{
        origin: "http://localhost:3000",
    },
});

let activeUsers = [];

io.on('connection',(socket)=>{
    // console.log("a user connected",socket.id);
    // const response = new Date();
    // socket.send(response);

    //add new user
    socket.on("new-user-add", (newUserId)=>{
        //if user is not added previously
        if(!activeUsers.some((user)=> user.userId === newUserId)){
            activeUsers.push({userId: newUserId, socketId: socket.id});
            console.log("New User Connected", activeUsers);
        }
        //send all active users to new user
        io.emit("get-users", activeUsers);
    });

    socket.on("disconnect",()=>{
        //remove user from active users
        activeUsers = activeUsers.filter((user)=> user.socketId !== socket.id);
        console.log("User Disconnected", activeUsers);
        //send all active users to all users
        io.emit("get-users", activeUsers);
    });


    //send message to a specific user
    socket.on("send-message", (data)=>{
        const {receiverId} = data;
        const user = activeUsers.find((user)=>user.userId === receiverId);
        console.log("Sending from socket to :", receiverId);
        console.log("Data: ", data);
        if(user){
            io.to(user.socketId).emit("recieve-message", data);
        }
    });
    

    //custom event server to client data
    //socket.emit("myevent", "hello iqbal");

    // socket.on("myevent", function(data){
    //     console.log(data);
    // });

    // socket.on("disconnect",()=>{
    //     console.log("User disconnected", socket.id)
    // })
})