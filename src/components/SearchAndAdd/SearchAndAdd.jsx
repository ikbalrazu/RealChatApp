import React, { useEffect,useState } from 'react'
import {TextField,Button,Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const SearchAndAdd = ({members,currentUser,handleChat}) => {
  const [btnStatus, setBtnStatus] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);



  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 }
  ];

  const userInfo = JSON.parse(localStorage.getItem("userdetails"));

  const config = {
    headers:{
      Authorization: 'Bearer ' + userInfo?.token
    }
  };

  const handleSearch = async () => {
    //console.log(members);

    try{
      const {data} = await axios.post("/user/searchuser",members);
      //console.log("search result: ",data);
      setSearchResult(data);

    }catch(error){
      console.log(error);
    }
  }

  const addMembers = async(receiverId,props) =>{
    console.log(searchResult);
    const senderId = currentUser;
    console.log(props);
    console.log(props['data-option-index']);
    const index = props['data-option-index'];
    const newSearchResult = [...searchResult];
    newSearchResult[index].status = "Added";
    setSearchResult(newSearchResult);
    try{
      const data = await axios.post("/chat",{senderId,receiverId})
      console.log(data);
      // let temp = [...searchResult];
      // temp[index].btnStatus = "Added";
      // setSearchResult([...temp]);
      // setBtnStatus("Added");
      const chatdata = await axios.get(`/chat/${currentUser}`,config);
      console.log(chatdata);
      handleChat(chatdata?.data);
      searchResult([null]);
      // if(data?.status === "200"){
      //   console.log(data?.data);
      //   // onChange(data);
      //   // searchResult([null]);
      // }
      
    }catch{
      console.log("error");
    }

  }

  

  useEffect(()=>{
    //console.log(members);
  },[members]);

  return (
    <>
    <Box bgcolor="#fff" justifyContent="center">
    <Autocomplete
        sx={{width:"90%",marginLeft:"10px"}}
        p={1}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={searchResult}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
              {...params}
              label="Search by name or email"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
              onClick={handleSearch}
          />
        )}
        
        renderOption={(props,option) => (
          <>
          <div>
          <p>{option?.name}</p><button disabled={option.status} onClick={()=>addMembers(option?._id,props)} value="Add">{option.status ? "Added" : "Add"}</button>
          </div>
          
          </>
        )}
        
    />
    </Box>

    {/* <div className='search'>
    <div className="searchInput">
    <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={searchResult}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
              {...params}
              label="Search by name or email"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
              onClick={handleSearch}
          />
        )}
        
        renderOption={(props,option) => (
          <>
          <div>
          <p>{option?.name}</p><button disabled={option.status} onClick={()=>addMembers(option?._id,props)} value="Add">{option.status ? "Added" : "Add"}</button>
          </div>
          </>
        )}
        
      />
    </div>
    </div> */}
    </>
  )
}



export default SearchAndAdd