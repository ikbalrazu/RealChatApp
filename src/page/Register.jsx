import React, {useState} from 'react';
import axios from 'axios';

const Register = () => {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [confirmpassword,setConfirmPassword] = useState();

    const RegisterUser = async() =>{
        console.log(name, email, password, confirmpassword);
        if (!name || !email || !password || !confirmpassword) {
            console.log("Please complete all mandatory information!");
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            console.log("Invalid Email entered.");
        } else if(password !== confirmpassword){
            console.log("password is not match!");
        }else{
            const data = await axios.post("/user/register",{name,email,password});
            console.log(data?.data);
        }
    }

  return (
    <div>
    <div className="login">Registration</div>
    <div className="name">
    <input type="text" onChange={(e) => setName(e.target.value)} placeholder='Enter Name'/>
    </div>
    <div className="email">
    <input type="text" onChange={(e) => setEmail(e.target.value.toLowerCase())} placeholder='Enter Email'/>
    </div>
    <div className="password">
    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password'/>
    </div>
    <div className="confirm-password">
    <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Enter Confirm Password'/>
    </div>
    <button onClick={RegisterUser}>Registration</button>
    <div className="resigtration">
    <a href='/'><button>Already have an account!</button></a>
    </div>
    </div>
  )
}

export default Register