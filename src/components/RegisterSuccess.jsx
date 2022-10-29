import React from "react";
import { Box,Button,AlertTitle, Alert, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const RegisterSucccess = () => {

    return(
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
        <Typography variant="h4">Congratulations!</Typography>
        <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Your account has been successfully created — <strong>Thanks!</strong>
        </Alert>
        <Link to="/" style={{textDecoration:"none"}}><Button variant="outlined">Now you can Sign In</Button></Link>
        </Box> 
        </div>
    )
}

export default RegisterSucccess;