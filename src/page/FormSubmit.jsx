import { TextField, Button } from '@mui/material';
import React from 'react'
import {useForm,Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const FormSubmit = () =>{

    const SignupSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
        // age: yup.number().required().positive().integer(),
        // website: yup.string().url()
    });

      const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(SignupSchema)
      });
      const onSubmit = data => {
        console.log(data);
      };
    
      const style = {
        margin: "auto",
        "max-width": "300px"
      };


    return(
        <div>
        <form onSubmit={handleSubmit(onSubmit)} style={style}>
            <Controller
            name='username'
            control={control}
            rules={{required:true}}
            render={({field})=>(
                <TextField
                {...field}
                label="Username"
                helperText={errors?.username ? errors?.username?.message : ""}
                type="email"
                fullWidth
                />
            )}
            />
            {/* {errors.username && <p>{errors.username.message}</p>} */}

            <Controller
            name='password'
            control={control}
            rules={{required:true}}
            render={({field})=>(
                <TextField
                {...field}
                label="password"
                helperText={errors?.password ? errors?.password?.message : ""}
                type="password"
                fullWidth
                />
            )}
            />
        {/* <TextField
        name="password"
        error={!!errors?.password}
        label="Password"
        helperText={errors?.password ? errors?.password?.message : ""}
        type="password"
        fullWidth
      /> */}

      <Button color="primary" type="submit" variant="contained" fullWidth>
        Submit
      </Button>
    </form> 
        </div>
    )
}
export default FormSubmit;