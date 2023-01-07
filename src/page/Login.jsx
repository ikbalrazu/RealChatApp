import React,{useReducer} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Box,Button,TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Initial_State } from '../Reducer/reducer';
import reducer from '../Reducer/reducer';

import './Login.css';

const Login = () => {
    const chatpage = useNavigate();

    const [state, dispatch] = useReducer(reducer,Initial_State);


    const SignupSchema = yup.object().shape({
      email: yup.string().required('Email is required').email('Email is invalid'),
      password: yup.string()
      .required('Password is required')
      .min(8, 'Password must contain at least 8 characters'),
    });

    const { handleSubmit, control, formState: { errors } } = useForm({
      resolver: yupResolver(SignupSchema)
    });
    
    const onSubmit = async(value) => {
      const email = value?.email;
      const password = value?.password;

      try{
        dispatch({type:"SET_LOADER",payload:true});

        const data = await axios.post("/user/login",{email,password});

        if(data?.data?.message === "User Not Found"){
          
          dispatch({type:"SET_LOADER",payload:false});
          console.log("User Not Found this email");
          dispatch({type:"SET_ALERT_CONTENT",payload:"User Not Found this email."});
          dispatch({type:"SET_ALERT",payload:true});
        }else{
          dispatch({type:"SET_ALERT",payload:false});
          dispatch({type:"SET_LOADER",payload:true});
          localStorage.setItem(
            "userdetails",
            JSON.stringify({
              id:data?.data?._id,
              name:data?.data?.name,
              email:data?.data?.email,
              picture:data?.data?.picture,
              token:data?.data?.token,
            })
          );
          dispatch({type:"SET_LOADER",payload:false});
          chatpage("/chat");
        }

      }catch(error){
        if(error && error?.response?.status === 400){
          
          dispatch({type:"SET_ALERT_CONTENT",payload:"Wrong Password."});
          dispatch({type:"SET_ALERT",payload:true});
          dispatch({type:"SET_LOADER",payload:false});
        }
      }
    }

    // const style = {
    //   margin: "auto",
    //   "max-width": "300px"
    // };
    
  return (
    <div 
    style={{
      // border:"1px solid red"
      }}>
      <Box
      onSubmit={handleSubmit(onSubmit)}
      bgcolor={"white"}
      component="form"
      maxWidth={320}
      maxHeight={1000}  
      sx={{
        display:"flex",
        flexDirection:"column",
        // border:"1px solid green"
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
      <Typography variant="h2">Sign In</Typography>

      {state?.alert ? <Alert severity='error'>{state?.alertContent}</Alert> : <></> }


      
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
            type={"password"}
            fullWidth
            name='password'
            {...field}
            error={!!errors['password']}
            helperText={errors['password'] ? errors['password'].message : ''}
            id="outlined-basic" 
            label="Password" 
            variant="outlined"
            />
          )}
          />

      

      <Button 
      variant='contained'
      type="submit" 
      >
      Let's Go
      </Button>
      
      

      <Typography>
        <Link to="forgotpassword">Forgot Password?</Link>
      </Typography>
      <Link style={{textDecoration:"none"}} to="register"><Button>Registration</Button></Link>
      {state?.loader ? <LinearProgress sx={{ width: '100%' }}/> : <></>}
      </Box>
      
    </div>
  )
}

export default Login