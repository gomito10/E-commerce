"use client"
import {useForm} from 'react-hook-form'
import {TextField,Box,Checkbox,FormControlLabel,Button,Typography,Container, Snackbar, IconButton, Alert, InputAdornment} from '@mui/material'
import {useRouter} from 'next/navigation'
<<<<<<< HEAD
import {useState,useContext} from 'react'
import {crearContexto} from '../../crearContexto'
export default function Login(){
  const router=useRouter();
  const{token,setToken}=useContext(crearContexto);
=======
import {useEffect, useState} from 'react'
import { Close, VisibilityOff } from '@mui/icons-material'
import  VisibilityIcon from "@mui/icons-material/Visibility";
export default function Login(){
  const router=useRouter();
  const[open,setOpen]=useState(false);
  const[showPassword,setShowPassword]=useState(false)
>>>>>>> 3dde271f8c48691be7ac3abdf38a9a2c887aa755
  const{
    register,
    handleSubmit,
    watch,
    formState:{errors},
    setError
  }=useForm()
 async function onSubmit(data){
  try{
    const response=await fetch("http://localhost:4000/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
<<<<<<< HEAD
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
=======
      body:JSON.stringify(data),
      credentials:'include'
    });
    if(response.status===403){
      router.push("/login")
>>>>>>> 3dde271f8c48691be7ac3abdf38a9a2c887aa755
    }
    const result=await response.json();
    if(!response.ok){
      if(result.error==="USER_NOT_FOUND" || result.error==="INVALID_PASSWORD"){
        setOpen(!open)
        
      }
      
    }else{
      router.push("http://localhost:3000")
    }
   
  }catch(error){
    console.error("Error",error);
    setError("password",{message:"Hubo un problema al conectar con el servidor"})
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
<<<<<<< HEAD
      required:"Completrar este campo",
=======
      required:"Completar este campo",
>>>>>>> 3dde271f8c48691be7ac3abdf38a9a2c887aa755
    })}
    helperText={errors.usuario && errors.usuario.message}
    label="username"
    variant="outlined"
    color={errors.usuario ? "error" : "info"}
    fullWidth
    error={!!errors.usuario}
<<<<<<< HEAD
    />
=======
    type={showPassword ? "text" : "password"}
    slotProps={{
      input:{
        endAdornment:<InputAdornment position="end">
        <IconButton onClick={()=>setShowPassword(!showPassword)} edge="end">
          {showPassword ? <VisibilityIcon /> : <VisibilityOff/>}
        </IconButton>
      </InputAdornment>
      
      }
>>>>>>> 3dde271f8c48691be7ac3abdf38a9a2c887aa755
  
      

    }}
    sx={{
      "& input[type=password]::-ms-reveal": { display: "none" },
      "& input[type=password]::-ms-clear": { display: "none" },
      "& input[type=password]::-webkit-reveal-button": { display: "none" },
      "& input[type=password]::-webkit-clear-button": { display: "none" }
    }}
    />
    <TextField
    {...register("password",{
<<<<<<< HEAD
      required:"Completar este campo"})}
=======
      required:"Completar este campo"
    })}
>>>>>>> 3dde271f8c48691be7ac3abdf38a9a2c887aa755
    helperText={errors.password && errors.password.message}
    label="password"
    variant="outlined"
    color={errors.password ? "error" : "info"}
    error={!!errors.password}
    fullWidth
    sx={{margin:"10px 0"}}
    type="password"
    />
    <Button variant="contained" color="error" fullWidth type="submit" sx={{padding:"15px 0"}}>Iniciar sesión</Button>
    <FormControlLabel control={<Checkbox color="error"/>} label="Recordarme" sx={{color:"red"}}/>
    </form>
    <Box sx={{width:"100%",display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
    <Typography variant="body2" className="text-gray-500 ml-auto">¿No tienes cuenta?</Typography>
    <Button  sx={{color:"red",padding:0}} onClick={handleRegister} size="large">Registrate ahora</Button>
    </Box>
    </Box>
    <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          onClose={()=>setOpen(false)}
          autoHideDuration={2000}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={()=>setOpen(false)}>
              <Close fontSize="small" />
            </IconButton>
          }
        >
          <Alert
            severity="error"
            variant="filled"
            >
              contrasena o usuario incorrectos
          </Alert>
          </Snackbar>
    </Container>
    </>
  )
}