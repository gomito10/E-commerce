"use client"
import {List,ListItem,ListItemButton,ListItemText,Typography,Container,Box,Button,IconButton,Grid2,Breadcrumbs,Paper,Dialog,DialogTitle,DialogContent,InputLabel,TextField,DialogActions,Stack,NativeSelect,FormControl,MenuItem, DialogContentText} from "@mui/material"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {useRouter} from 'next/navigation'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Link from "next/link"
import {useRef,forwardRef,useState,useEffect,useContext} from "react";
import { crearContexto } from "@/app/crearContexto";
import {useForm} from "react-hook-form"
const MisDatos=(close)=>{
    const[open,setOpen]=useState(false);
    const[data,setData]=useState({});
    const{token}=useContext(crearContexto)
    const[nombre,setNombre]=useState("")
    const{register,watch,handleSubmit}=useForm()
    
    const fetchData=async ()=>{
      try{
      const response=await fetch("http://localhost:4000/datos",{
        method:"GET",
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      const result=await response.json();
      setData(result)
      }catch(error){
        console.error("Error de usuario en datos")
      }
      }
    function handleBack(){
      document.getElementById("datos").scrollIntoView({behavior:"smooth",block:"center"})
      window.scrollTo(0,0)
    }
   async function onSubmit(data){
      const response=await fetch("http://localhost:4000/datos",{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(data)
      })
     if(!response.ok){
        alert("datos incorrectos")
      }
      const result=await response.json();
      console.log(result);
      close
    }
    
    useEffect(()=>{
      
      fetchData()
    },[data])
    
    const usuario=watch("username")
    return(
      <Container className="py-3 shrink-0 bg-gray-100" id="/perfil">
        <IconButton onClick={handleBack}>
          <KeyboardBackspaceIcon color="secondary"/>
          <Typography variant="body2" color="secondary">Volver</Typography>
        </IconButton>
          <Typography variant="h6" color="initial">Datos personales</Typography>
        <Box className="bg-white py-3">
            <List>
              <ListItem>
                <ListItemText>
                  <Typography variant="body1" color="initial" className="font-bold">Nombre</Typography>
                  <Typography variant="body2" className="text-gray-500" >{data.username}</Typography>
                </ListItemText>
                </ListItem>
                            <ListItem>
                <ListItemText>
                  <Typography variant="body1" color="initial" className="font-bold">Apellido</Typography>
                  <Typography variant="body2" className="text-gray-500">{data.apellido}</Typography>
                </ListItemText>
                </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography variant="body1" color="initial" className="font-bold">Email</Typography>
                  <Typography variant="body2" className="text-gray-500">{data.email}</Typography>
                </ListItemText>
                </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography variant="body1" color="initial" className="font-bold">Dni</Typography>
                  <Typography variant="body2" className="text-gray-500">{data.documento}</Typography>
                </ListItemText>
                </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography variant="body1" color="initial" className="font-bold">Teléfono</Typography>
                  <Typography variant="body2" className="text-gray-500">{data.tel}</Typography>
                </ListItemText>
                </ListItem>
            </List>
            <Button variant="outlined" color="secondary" size="large" sx={{margin:"0 auto",display:"block"}} onClick={()=>setOpen(!open)}>Editar</Button>
        </Box>
        <Dialog open={open} onClose={()=>setOpen(!open)}>
          <DialogTitle>Editar datos personales
                  <IconButton onClick={()=>setOpen(!open)}>
            <CloseIcon/>
          </IconButton>
          </DialogTitle>
          <DialogContent>
              <form onSubmit={handleSubmit(onSubmit)}>
              <InputLabel htmlFor="nombre" className="font-bold">Nombre</InputLabel>
              
              <TextField color="primary" variant="outlined" type="text" fullWidth id="nombre" {...register("nombre")} defaultValue={data.username}/>
              <InputLabel htmlFor="apellido" className="font-bold mt-5">Apellido</InputLabel>
              <TextField color="primary" variant="outlined" defaultValue={data.apellido} type="text" id="apellido" {...register("apellido")}/>
              <InputLabel htmlFor="email" className="font-bold mt-5">Email</InputLabel>
              <TextField color="primary" variant="outlined" defaultValue={data.email} type="email" id="email" {...register("email")}/>
              <InputLabel htmlFor=" dni" className="font-bold mt-5">DNI</InputLabel>
              <TextField color="primary" variant="outlined" defaultValue={data.documento} type="number" id="dni" {...register("dni")}/>
              <InputLabel htmlFor="telefono" className="font-bold mt-5">Teléfono</InputLabel>
              <TextField color="primary" variant="outlined" defaultValue={data.tel} type="text" id="telefono" {...register("telefono")}/>
              <Button variant="contained" color="secondary" fullWidth type="submit">
              Guardar cambios
            </Button>
              </form>
          </DialogContent>
        </Dialog>
        </Container>
    )
  }