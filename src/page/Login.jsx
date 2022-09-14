import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const chatpage = useNavigate();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    
    const LoginUser = async() => {
        if (!email || !password) {
            console.log("Please fill the all fields");
        }else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            console.log("Invalid Email !.");
        }
        else{
            const data = await axios.post("/user/login",{email,password});
            
            if(data?.data?.message === "User Not Found"){
                console.log("User Not Found");
            }else{
                console.log(data?.data);
                localStorage.setItem(
                    "userdetails",
                    JSON.stringify({
                      id:data?.data?._id,
                      name:data?.data?.name,
                      email:data?.data?.email,
                      picture:data?.data?.picture,
                    })
                  );
                chatpage("/chat");
            }
        }
    }
    
  return (
    <div>

    <div className="login">Login</div>
    <div className="email">
    <input type="text" onChange={(e) => setEmail(e.target.value.toLowerCase())} placeholder='Enter Email'/>
    </div>
    <div className="password">
    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password'/>
    </div>
    <button onClick={LoginUser}>Login</button>
    <div className="resigtration">
    <a href='/register'><button>Registration</button></a>
    </div>

    </div>
  )
}

export default Login