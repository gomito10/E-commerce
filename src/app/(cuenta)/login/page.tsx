"use client"
import {useForm} from 'react-hook-form'
import {TextField,Box,Checkbox,FormControlLabel,Button,Typography,Container} from '@mui/material'
import {useRouter} from 'next/navigation'
import {useState,useContext} from 'react'
import {crearContexto} from '../../crearContexto'
export default function Login(){
  const router=useRouter();
  const{token,setToken}=useContext(crearContexto);
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
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    });
    const result=await response.json();
    if(!response.ok){
      if(result.error==="USER_NOT_FOUND" || result.error==="INVALID_PASSWORD"){
      alert("Datos invresados incorrectos")
      }
    }else{
      router.push("http://localhost:3000");
      setToken(result.token);
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
    <TextField {...register("usuario",{
      required:"Completrar este campo",
    })}
    helperText={errors.usuario && errors.usuario.message}
    label="username"
    variant="outlined"
    color={errors.usuario ? "error" : "info"}
    fullWidth
    error={!!errors.usuario}
    />
  
    <TextField
    {...register("password",{
      required:"Completar este campo"})}
    helperText={errors.password && errors.password.message}
    label="password"
    variant="outlined"
    color={errors.password ? "error" : "info"}
    error={!!errors.password}
    fullWidth
    sx={{margin:"10px 0"}}
    />
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