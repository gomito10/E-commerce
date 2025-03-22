"use client"
import {useForm} from 'react-hook-form'
import {TextField,Box,Checkbox,FormControlLabel,Button,Typography,Container} from '@mui/material'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
export default function Login(){
  const router=useRouter();
  
  const{
    register,
    handleSubmit,
    watch,
    formState:{errors},
    setError
  }=useForm()
 async function onSubmit(data){
    const response=await fetch("http://localhost:4000/login",{
      method:"POST",
      headers:{
        "Content-Type":"spplication/json"
      },
      body:JSON.sytringify(data)
    });
    const result=response.json(data);
    if(!result.ok){
      setError("paasword",{message:result.message})
    }
    
  }
  function handleRegister(){
    router.push("/register")
  }
  return(
    <>
      <Container>
    <Box className="w-full">
    <form onSubmit={handleSubmit(onSubmit)}>
    <TextField {...register("username",{
      required:"Completrar este campo",
    })}
    helperText={errors.username && errors.username.message}
    label="username"
    variant="outlined"
    color={errors ? "error" : "info"}
    fullWidth
    error={errors.username}
    />
  
    <TextField
    {...register("password",{
      required:"El campo debe estar completo"
    })}
    helperText={errors.password && errors.password.message}
    label="password"
    variant="outlined"
    color={errors ? "error" : "info"}
    error={errors.password}
    fullWidth
    sx={{margin:"10px 0"}}
    />
    {errors.password && errors.password.message}
    <Button variant="contained" color="error" fullWidth type="submit" sx={{padding:"15px 0"}}>Iniciar sesión</Button>
    <FormControlLabel control={<Checkbox color="error"/>} label="Recordarme" sx={{color:"red"}}/>
    </form>
    <Box sx={{width:"100%",display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
    <Typography variant="body2" className="text-gray-500 ml-auto">¿No tienes cuenta?</Typography>
    <Button variant="standard" sx={{color:"red",padding:0}} onClick={handleRegister} size="large">Registrate ahora</Button>
    </Box>
    </Box>
    </Container>
    </>
  )
}