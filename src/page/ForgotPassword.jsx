import React,{useState} from "react";
import { Box,Button,Divider,TextField, Typography } from '@mui/material';
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

const ForgotPassword = () => {
    const [email,setEmail] = useState();
    const [alert,setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [loader,setLoader] = useState(false);

    const SendResetPasswordLink = async() =>{
        if(!email){
            setAlertContent("Please enter email!");
            setAlert(true);
        }else{
            const data = await axios.get(`/user/resetpasswordlink/${email}`);
            console.log(data);
            if(data?.data?.message === "send email successfully"){
                setAlertContent("Send email successfully!");
                setAlert(true);
            }else{
                setAlertContent("Not found any account with this email.");
                setAlert(true);
            }
        }
        
    }

    return(
        <div>
        <Box
        bgcolor={"white"}
        component="form"
        maxWidth={320}
        maxHeight={1000}  
        sx={{
        display:"flex",flexDirection:"column",
        // ":hover":{boxShadow: "10px 10px 10px #ccc"}
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
        
        <Typography variant="h2">Forgot Password?</Typography>

        {alert ? <Alert severity='error'>{alertContent}</Alert> : <></> }

        <Divider sx={{width:"100%"}} variant="light"/>

        <Typography>	
        Please enter your email address and we will send you a password reset link shortly.
        </Typography>

        <TextField type={'email'} onChange={(e) => setEmail(e.target.value.toLowerCase())} id="outlined-basic" label="Email" variant="outlined"/>
        <Stack direction="row" spacing={2}>
        <Link to="/" style={{textDecoration:"none"}}><Button variant="outlined">Cancel</Button></Link>
        <Button variant='contained' onClick={SendResetPasswordLink}>Send</Button>
        </Stack>
        </Box>
        </div>
    )
}

export default ForgotPassword;