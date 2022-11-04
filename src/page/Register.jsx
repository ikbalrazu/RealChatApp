import React, {useState,useReducer} from 'react';
import axios from 'axios';
import { Box,Button,Stack,TextField, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { Link, useNavigate } from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Register_User } from '../Reducer/reducer';
import reducer from '../Reducer/reducer';

const Register = () => {
    const loginpage = useNavigate();

    //alert handling
    const [alert,setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    //set image
    const [uploadimg,setUploadImg] = useState(true);
    const [filename,setFileName] = useState();
    const [imageinfo,setImageInfo] = useState();
    const [success,setSuccess] = useState(false);

    const [loader,setLoader] = useState(false);

    const SignupSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().required('Email is required').email('Email is invalid'),
        password: yup.string()
        .required('Password is required')
        .min(8, 'Password must contain at least 8 characters'),
        confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Password must match')
    });

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(SignupSchema)
    });

    const [state, dispatch] = useReducer(reducer,Register_User);

    const RegisterForm = async(value) =>{
        //console.log(value);
        const email = value?.email;
        setLoader(true);
        const data = await axios.post("/user/checkuserbyemail",{email});
        if(data?.data?.message === "User already exists"){
            setLoader(false);
            setAlertContent("Email address already in use !");
            setAlert(true);
        }else{
            
            dispatch({type:"USER_REGISTRATION",Name:"name",value:value.name});
            dispatch({type:"USER_REGISTRATION",Name:"email",value:value.email});
            dispatch({type:"USER_REGISTRATION",Name:"password",value:value.password});
            setLoader(false);
            setUploadImg(false);
        }
    }

    // const client = axios.create({
    //     baseURL: "https://api.cloudinary.com" 
    // });

    const RegisterUser = async() => {
        //console.log(picture);
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
                    // console.log(data);
                    // console.log(data.url.toString());
                    //setPicture(data.url.toString());
                    const imageurl = data.url.toString()
                    ConfirmRegistration(imageurl);
                })
                .catch((err)=>{
                    setLoader(false);
                }); 

    }

    const ConfirmRegistration = async(picture) => {
        const name = state.name;
        const email = state.email;
        const password = state.password;
        const data = await axios.post("/user/register",{name,email,password,picture});
        //console.log(data);

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
        const name = state.name;
        const email = state.email;
        const password = state.password;
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
    onSubmit={handleSubmit(RegisterForm)}
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

    <Controller
        name='name'
        control={control}
        rules={{required:true}}
        render={({field})=>(
            <TextField
            {...field}
            label="Name"
            error={!!errors['name']}
            helperText={errors['name'] ? errors['name'].message : ''}
            type="text"
            fullWidth
            />
          )}
    />

    <Controller
        name='email'
        control={control}
        rules={{required:true}}
        render={({field})=>(
            <TextField
            {...field}
            label="Email"
            error={!!errors['email']}
            helperText={errors['email'] ? errors['email'].message : ''}
            type="email"
            fullWidth
            />
          )}
    />

    <Controller
        name='password'
        control={control}
        rules={{required:true}}
        render={({field})=>(
            <TextField
            {...field}
            label="Password"
            error={!!errors['password']}
            helperText={errors['password'] ? errors['password'].message : ''}
            type="password"
            fullWidth
            />
          )}
    />

    <Controller
        name='confirmpassword'
        control={control}
        rules={{required:true}}
        render={({field})=>(
            <TextField
            {...field}
            label="Confirm Password"
            error={!!errors['confirmpassword']}
            helperText={errors['confirmpassword'] ? errors['confirmpassword'].message : ''}
            type="password"
            fullWidth
            />
          )}
    />

    <Button variant='contained' type='submit'>Continue</Button>

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

    
    </div>
  )
}

export default Register