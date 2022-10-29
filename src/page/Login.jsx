import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Box,Button,TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = () => {
    const chatpage = useNavigate();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [alert,setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [loader,setLoader] = useState(false);
    
    const LoginUser = async() => {
        if (!email || !password) {
            console.log("Please fill the all fields");
            setAlertContent("Please fill the all fields");
            setAlert(true);
        }
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            console.log("Invalid Email !.");
            setAlertContent("Invalid Email !");
            setAlert(true);
        }
        else{
          setAlertContent(" ");
          setAlert(false);
            setLoader(true);
            const data = await axios.post("/user/login",{email,password});
            
            if(data?.data?.message === "User Not Found"){
                setLoader(false);
                console.log("User Not Found");
                setAlertContent("User Not Found.");
                setAlert(true);
            }else{
                setAlert(false);
                setLoader(true);
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
                  setLoader(false);
                chatpage("/chat");
            }
        }
    }
    
  return (
    <div className='container'>

      <Box
      bgcolor={"white"}
      component="form"
      maxWidth={320}
      maxHeight={1000}  
      sx={{display:"flex",flexDirection:"column"}} 
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
      <Typography variant="h2">Sign In</Typography>
      {alert ? <Alert severity='error'>{alertContent}</Alert> : <></> }
      <TextField type={'email'} onChange={(e) => setEmail(e.target.value.toLowerCase())} id="outlined-basic" label="Email" variant="outlined"/>
      <TextField type={"password"} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined"/>
      <Button variant='contained' onClick={LoginUser}>Let's Go</Button>
      <Typography>
        <Link to="forgotpassword">Forgot Password?</Link>
      </Typography>
      <Link style={{textDecoration:"none"}} to="register"><Button>Registration</Button></Link>
      {loader ? <LinearProgress sx={{ width: '100%' }}/> : <></>}
      </Box>
    </div>
  )
}

export default Login