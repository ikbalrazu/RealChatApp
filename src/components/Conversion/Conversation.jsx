import { Box, Stack, Avatar, Badge, Typography } from '@mui/material';
import axios from 'axios';
import React,{useEffect,useState} from 'react'


const Conversation = ({data,currentUserId,online}) => {
  const [userData,setUserData] = useState([]);
  //let userData = [];
  

  useEffect(()=>{
    const userId = data?.members?.find((id)=>id!==currentUserId);
    console.log(userId);
    const getUserData = async ()=> {
      try
      {
        const {data} =await axios.get(`/user/${userId}`)
        //console.log(data);
        setUserData(data)
      }
      catch(error)
      {
        console.log(error)
      }
    }

    getUserData();
    
  },[])

  return (
    <Box sx={{marginLeft:"10px"}} onClick={()=>console.log("conversion")}>
      <Stack direction="row" spacing={3}>
      <Badge color={online?"success":"default"} overlap="circular" badgeContent=" " variant="dot">
      <Avatar alt="Remy Sharp" src={userData?.picture} style={{ width: "50px", height: "50px" }}/>
      </Badge>
      <Typography style={{fontSize:"20px"}}>{userData?.name}</Typography>
      </Stack>
    </Box>
  )
}

export default Conversation