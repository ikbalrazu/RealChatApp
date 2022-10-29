import React, {useState} from 'react';
import axios from 'axios';
import { Box,Button,Stack,TextField, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const loginpage = useNavigate();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [confirmpassword,setConfirmPassword] = useState();

    //alert handling
    const [alert,setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    //set image
    const [uploadimg,setUploadImg] = useState(true);
    const [filename,setFileName] = useState();
    const [imageinfo,setImageInfo] = useState();
    const [success,setSuccess] = useState(false);

    const [loader,setLoader] = useState(false);

    const RegisterForm = async() =>{
        //console.log(name, email, password, confirmpassword);
        if (!name || !email || !password || !confirmpassword) {
            console.log("Please complete all mandatory information!");
            setAlertContent("Please complete all mandatory information !");
            setAlert(true);
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            console.log("Invalid Email entered.");
            setAlertContent("Invalid Email entered.");
            setAlert(true);
        } else if(password !== confirmpassword){
            console.log("password is not match!");
            setAlertContent("Password is not match !");
            setAlert(true);
        }else{
            setLoader(true);
            const data = await axios.post("/user/checkuserbyemail",{email});
            console.log(data);
            if(data?.data?.message === "User already exists"){
                setLoader(false);
                setAlertContent("Email address already in use !");
                setAlert(true);
            }else{
                setLoader(false);
                setUploadImg(false);
            }
            //setUploadImg(false);
            // const data = await axios.post("/user/register",{name,email,password});
            // console.log(data?.data);
        }
    }

    // const client = axios.create({
    //     baseURL: "https://api.cloudinary.com" 
    // });

    const RegisterUser = async() => {
        // console.log(picture);
        setLoader(true);
        const formdata = new FormData();
        formdata.append("file",imageinfo);
        formdata.append("upload_preset","MERN-Chat-Application");
        formdata.append("cloud_name", "iqbalraju");

        fetch("https://api.cloudinary.com/v1_1/iqbalraju/image/upload",{
            method: "post",
            body: formdata,
            }).then((res)=>res.json())
                .then((data)=>{
                    console.log(data);
                    // console.log(data.url.toString());
                    //setPicture(data.url.toString());
                    const imageurl = data.url.toString()
                    ConfirmRegistration(imageurl);
                })
                .catch((err)=>{
                    setLoader(false);
                    console.log(err);
                });

        

    }

    const ConfirmRegistration = async(picture) => {
        const data = await axios.post("/user/register",{name,email,password,picture});
        console.log(data);

        if(!data){
            setLoader(false);
            console.log("Failed to create the user");
        }else{
            setLoader(false);
            console.log("Account created successfully!");
            loginpage("/registersuccess");
        }
    }

    const RegisterUserWithoutImage = async() => {
        setLoader(true);
        const data = await axios.post("/user/register",{name,email,password});
        console.log(data);

        if(!data){
            setLoader(false);
            console.log("Failed to create the user");
        }else{
            setLoader(false);
            console.log("Account created successfully!");
            loginpage("/registersuccess");
        }
               
    }

    

    const uploadImage = (picture) =>{
        console.log(picture);
        
        const size = picture?.size;
        if(size/1024 > 2000){
            setFileName("Image size must not be greater then 2MB");
        }else{
            setFileName(picture?.name);
            setImageInfo(picture)
        }

    }

    // const check = () => {
    //     console.log(data);
    // }

  return (
    <div>

    {uploadimg ?
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
    {alert ? <Alert severity='error'>{alertContent}</Alert> : <></> }
    <TextField type={'text'} onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Name" variant="outlined"/>
    <TextField type={'email'} onChange={(e) => setEmail(e.target.value.toLowerCase())} id="outlined-basic" label="Email" variant="outlined"/>
    <TextField type={"password"} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined"/>
    <TextField type={"password"} onChange={(e) => setConfirmPassword(e.target.value)} id="outlined-basic" label="Confirm Password" variant="outlined"/>
    
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

    <Button variant='contained' onClick={RegisterForm}>Continue</Button>

    <Typography>
        <Link to="/">Already have an account!</Link>
    </Typography>

</Box> : 
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
    <Button
    variant="contained"
    component="label"
    startIcon={<ImageIcon />}
    >
    Upload Image
    <input
    type="file"
    accept="image/png, image/jpeg"
    hidden
    onChange={(e)=>uploadImage(e.target.files[0])}
    />
    </Button>
    <Typography>{filename}</Typography>
    <Stack direction="row" spacing={8}>
    <Button variant="outlined" onClick={RegisterUserWithoutImage}>Skip</Button>
    <Button variant='contained' onClick={RegisterUser} >Confirm</Button>
    </Stack>
    {loader ? <LinearProgress sx={{ width: '100%' }}/> : <></>}
</Box> 
}

    

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