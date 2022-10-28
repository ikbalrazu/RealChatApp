import React, {useState} from 'react';
import axios from 'axios';
import { Box,Button,TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

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

    <Box
        bgcolor={"white"}
        component="form"
        maxWidth={320} 
        sx={{
        display:"flex",flexDirection:"column",
        // ":hover":{boxShadow: "10px 10px 10px #ccc"
        // }
        }} 
        justifyContent={"center"}
        alignItems="center"
        margin="auto"
        marginTop={5}
        padding={3}
        borderRadius={5}
        gap={2.5}
        boxShadow={3}
        sm={2}
        >
        <Typography variant="h2">Sign Up</Typography>
        <TextField type={'text'} onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Name" variant="outlined"/>
        <TextField type={'email'} onChange={(e) => setEmail(e.target.value.toLowerCase())} id="outlined-basic" label="Email" variant="outlined"/>
        <TextField type={"password"} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined"/>
        <TextField type={"password"} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Confirm Password" variant="outlined"/>
        
        {/* <Button
        variant="contained"
        component="label"
        >
        Upload File
        <input
            type="file"
            disabled
        />
        </Button> */}

        <Button variant='contained' onClick={RegisterUser}>Let's Go</Button>

        <Typography>
            <Link to="/">Already have an account!</Link>
        </Typography>

    </Box>

    {/* <div className="login">Registration</div>
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
    </div> */}
    </div>
  )
}

export default Register