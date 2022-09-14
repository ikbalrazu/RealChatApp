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
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

app.use(cors());

const port = process.env.PORT || 4000

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

const server = app.listen(port,function(error){
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

io.on('connection',(socket)=>{
    console.log("a user connected",socket.id);
    const response = new Date();
    socket.send(response);
})