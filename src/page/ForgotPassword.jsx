import React from "react";
import { Box,Button,Divider,TextField, Typography } from '@mui/material';
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

const ForgotPassword = () => {

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

        <Divider sx={{width:"100%"}} variant="light"/>

        <Typography>	
        Please enter your email address and we will send you a password reset link shortly.
        </Typography>

        <TextField type={'email'} id="outlined-basic" label="Email" variant="outlined"/>
        <Stack direction="row" spacing={2}>
        <Link to="/" style={{textDecoration:"none"}}><Button variant="outlined">Cancel</Button></Link>
        <Button variant='contained'>Send</Button>
        </Stack>
        </Box>
        </div>
    )
}

export default ForgotPassword;