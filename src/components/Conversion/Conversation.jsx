import axios from 'axios';
import React,{useEffect,useState} from 'react'

const Conversation = ({data,currentUserId,online}) => {
  const [userData,setUserData] = useState([]);
  //let userData = [];
  

  useEffect(()=>{
    console.log(data);
    console.log(currentUserId);
    
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
        console.log(data);
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
    <div>
    <div className='conversation'>
    <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" style={{ width: "50px", height: "50px" }}/>
    <span style={{color: online?"green":""}}>{online? "Online" : "Offline"}</span>
    <div>
    <p style={{fontSize:"20px"}}>{userData?.name}</p>
    </div>
      {/* <button onClick={()=>console.log(userData)}>click me</button> */}
    {/* {userData?.map((userdata,index)=>{
      return(
        <div key={index} onClick={()=>{
          
        }}>

          <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" style={{ width: "50px", height: "50px" }}/>
          <div>
            <p style={{fontSize:"20px"}}>{userdata?.name}</p>
          </div>
          <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </div>
      )
    })} */}
    
    </div>
    <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </div>
  )
}

export default Conversation