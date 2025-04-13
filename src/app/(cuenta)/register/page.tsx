"use client"
import {useState} from "react"
import {Container,TextField,Button,Fade,Alert,Typography,Dialog,IconButton,Stack} from "@mui/material"
import {useRouter} from "next/navigation"
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link'
import {useForm} from "react-hook-form"
export default function Register(){
  const[open,setOpen]=useState(false);
  const router=useRouter()
  const{
    register,
    handleSubmit,
    watch,
    formState:{errors},
    setError
  }=useForm()
  async function onSubmit(data){
    try{
      const response=await fetch("http://localhost:4000/Register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      const result=await response.json();
      if(result.errors){
        result.errors.forEach((error)=>{
          setError(error.path,{
            type:"manual",message:error.msg
          })
        })
      }else{
        setOpen(!open);
      }
    }catch(error){
      console.error("Error al registrar usuario",error.message)
    }
  }
  return(
    <Container>
      <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField variant="outlined" label="nombre" fullWidth className="registro" {...register("nombre",{required:"Completar este campo",pattern:{
          value:/^[a-zA-Z\s]+$/,
          message:"El campo debe contener sólo letras"
        },setValueAs:(value)=>value.trim()})} helperText={errors.nombre && errors.nombre.message}
        color={errors.nombre ? "error" : "primary"}
        error={!!errors.nombre}
        sx={{margin:"10px 0"}}
        />
      <TextField variant="outlined" label="apellido" className="registro" {...register("apellido",{required:"Completar este campo",pattern:{
        value:/^[a-zA-Z\s]+$/,
        message:"El vampo debe contener sólo letras"
      },setValueAs:(value)=>value.trim()})} fullWidth error={!!errors.apellido} helperText={errors.apellido && errors.apellido.message} color={errors.apellido ? "error" : "primary"}
      sx={{margin:"10px 0"}}
      />
      <TextField variant="outlined" label="Email" className="registro" {...register("email",{required:"Completar nuestro campo",pattern:{
        value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message:"Formato invalido"
      }})} fullWidth helperText={errors.email && errors.email.message} error={!!errors.email} color={errors.email ? "error" : "primary"} sx={{margin:"10px 0"}} type="email"/>
      <TextField variant="outlined" label="Documeto" className="registro" {...register("dni",{required:"Completar este campo",pattern:{
        value:/^[0-9]+$/,
        message:"El campo sólo debe contener caracteres numéricos"
      }})} fullWidth helperText={errors.dni && errors.dni.message} color={errors.dni ? "error" : "primary"} error={!!errors.dni} sx={{margin:"10px 0"}} type="number"/>
      <TextField variant="outlined" label="teléfono" className="registro" {...register("telefono",{required:"Completar este campo",pattern:{
        value:/^[0-9]+$/,
        message:"Formato invalido"
      }})} fullWidth helperText={errors.telefono && errors.telefono.message} color={errors.telefono ? "error" : "primary"} error={!!errors.telefono} sx={{margin:"10px 0"}} type="number"/>
      <TextField variant="outlined" label="usuario" className="registro" {...register("usuario",{required:"Completar este campo",maxLength:{
        value:20,
        message:"El campo no debe superar los 20 caracteres"
      },minLength:{
        value:8,
        message:"El campo debe tener un minimo de 8 caracteres"
      },pattern:{
        value:/^[a-zA-Z0-9]+$/,
        message:"El usuario solo debe contener letras y numeros"
      }})} helperText={errors.usuario && errors.usuario.message} error={!!errors.usuario} color={errors.usuario ? "error" : "primary"} fullWidth sx={{margin:"10px 0"}}/>
      <TextField variant="outlined" label="contraseña" className="registro" {...register("password",{required:"Completar este campo",maxLength:{
        value:20,
        message:"El campo no debe superar los 20 caracteres"
      },
        minLength:{
          value:8,
          message:"El campo debe tener un minimo de 8 caracteres"
        },
        pattern:{
          value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%+?&])[A-Za-z\d@$!%+?&]{0,}$/,
          message:"La contraseña debe tener al menos 1 mayuscula,una minuscula,un numero y un caracter especial"
        }
      })} helperText={errors.password && errors.password.message} color={errors.password ? "error" : "primary"} error={!!errors.password} fullWidth sx={{margin:"10px 0"}}/>
      <TextField variant="outlined" label="Confirmar contraseña" className="registro" {...register("confirmPassword",{required:"Completar este campo"})} helperText={errors.confirmPassword && errors.confirmPassword.message} error={!!errors.confirmPassword} color={errors.confirmPassword ? "error" : "primary"} fullWidth sx={{marcin:"10px 0"}}/>
      <Button variant="contained" color="success" type="submit" sx={{margin:"10px 0"}}>Registar</Button>
      </form>
            <Dialog open={open}>
          <Alert severity="success" onClose={()=>setOpen(!open)}>
            <Typography>
              Registro de usuario exitoso
            </Typography>
            <IconButton color="success" onClick={()=>router.push("/login")}>
              <HomeIcon/>
              <Typography>Ir a inicio</Typography>
            </IconButton>
          </Alert>
      </Dialog>
      <Button onClick={()=>setOpen(!open)}>open</Button>
      </>
    </Container>
  )
}