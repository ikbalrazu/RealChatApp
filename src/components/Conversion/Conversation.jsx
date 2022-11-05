import { Box, Stack, Avatar, Badge, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React,{useEffect,useState} from 'react'


const Conversation = ({data,currentUserId,online}) => {
  const [userData,setUserData] = useState([]);
  //let userData = [];
  

  useEffect(()=>{
    //console.log(data);
    //console.log(currentUserId);
    
    // for(let i=0;i<data?.length;i++){
    //   const userId = data[i]?.members?.find((id)=>id!==currentUserId);
    //   console.log(userId);
    //   axios.get(`/user/${userId}`).then(function(userdata){
    //     console.log(userdata);
    //     //userData.push(userdata?.data);
    //     setUserData((preData)=>[...preData,userdata?.data]);
    //   })
    // }

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
      {/* <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        
        <Avatar alt="Remy Sharp" src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" style={{ width: "50px", height: "50px" }}/>
      </StyledBadge> */}
      <Badge color={online?"success":"primary"} overlap="circular" badgeContent=" " variant="dot">
      <Avatar alt="Remy Sharp" src={userData?.picture} style={{ width: "50px", height: "50px" }}/>
      </Badge>
      <Typography style={{fontSize:"20px"}}>{userData?.name}</Typography>
      </Stack>
    </Box>

    // <div>
    // <div className='conversation'>
    // <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" style={{ width: "50px", height: "50px" }}/>
    // <span style={{color: online?"green":""}}>{online? "Online" : "Offline"}</span>
    // <div>
    // <p style={{fontSize:"20px"}}>{userData?.name}</p>
    // </div>
    // </div>
    // <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    // </div>
  )
}

export default Conversation