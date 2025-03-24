"use client"
import {List,ListItem,ListItemButton,ListItemText,Typography,Container,Box,Button,IconButton,Grid2,Breadcrumbs,Paper,Dialog,DialogTitle,DialogContent,InputLabel,TextField,DialogActions,Stack,NativeSelect,FormControl,MenuItem} from "@mui/material"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {useRouter} from 'next/navigation'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Link from "next/link"
import {useRef,forwardRef,useState,useEffect} from "react";
import {useForm} from "react-hook-form"
 function NewDirection(){
   const{
     register
   }=useForm();
   const opciones=["Argentina"]
   return(
       <Container id="direction">
         <Box>
         <Typography variant="body1" color="initial" className="font-extrabold">Añadir dirección</Typography>
           <form>
            <FormControl fullWidth>
             <InputLabel className="font-bold my-3">País</InputLabel>
            <NativeSelect
            value="Argentina"
            id="pais"
            inputProps={{
              name:"pais",
              id:"pais",
            }}
            sx={{
              "& .MuiNativeSelect-outlined":{
                backgroundColor:"white",
                padding:"10px"
              }
            }}
            >
              <option value="pais" disabled>País</option>
              <option value="Argentina">Argentina</option>
            </NativeSelect>
          </FormControl>
           <InputLabel className="font-bold mt-5">Código postal</InputLabel>
           <TextField {...register("postal")} variant="outlined" color="primary" fullWidth/>
           <Link href="#" className="my-5">
             <Typography variant="body2" color="primary">No conozco mi código postal</Typography>
           </Link>
           <Button variant="contained" color="secondary" fullWidth size="large">Guardar dirección</Button>
           </form>
         </Box>
       </Container>
     )
 }
function Direction(){
  const[open,setOpen]=useState(false);
  const{
    register
  }=useForm()
  function handleDirection(){
    document.getElementById("direction").scrollIntoView({
      behavior:"auto",
      block:"end"
    });
    window.scrollTo(0,0)
  }
  return(
      <Container>
        <Typography variant="body1" color="initial" className="font-bold">Direcciones</Typography>
        <Button variant="contained" color="secondary" className="my-10">Nueva dirección</Button>
        <Paper className="w-full p-10" elevation={7}>
          <Typography component="address" variant="body1" color="initial">
            Besares 1680<br/>
            Casa<br/>
            1755<br/>
            Rafael Castillo, Buenos Aires<br/>
            Argentina
          </Typography>
          <Button variant="outlined" color="secondary" className="mx-auto block mt-5" onClick={handleDirection}>Editar</Button>
        </Paper>
        <Dialog open={open} onClose={()=>setOpen(!open)}>
          <DialogTitle>
            <Typography variant="body1" color="initial" className="font-bold">Añadir dirección</Typography>
          </DialogTitle>
          <DialogContent>
            <Paper elevation={7}>
              <form>
                
              </form>
            </Paper>
          </DialogContent>
        </Dialog>
      </Container>
    )
}
function Autenticacion(){
  const[open,setOpen]=useState(false);
  const{
  handleSubmit,
  register,
  watch,
  formState:{errors},
  setFocus,
  trigger
}=useForm();
const password=watch("password")
async function handleChange(){
  await trigger(watch("password"))
}
  return(
      <Container>
        <Paper className="w-full p-10" elevation={7}>
          <Typography variant="body1" color="initial" className="font-bold">Contraseña</Typography>
          <Typography variant="body1" color="initial" className="mt-5 mb-10">Usted todavía no tiene una contraseña definida</Typography>
          <Button variant="outlined" color="secondary" size="large" className="mx-auto block" onClick={()=>setOpen(!false)}>Definir contraseña</Button>
        </Paper>
        <Paper className="my-10 p-10 w-full" elevation={7}>
          <Typography variant="body1" color="initial" className="font-bold">Gestión de sesiones</Typography>
          <Typography variant="body1" color="initial" className="mt-5 mb-10">Usted tiene 1 sesión activa</Typography>
          <Button variant="outlined" color="secondary" size="large" className="mx-auto block">ver sesiones</Button>
        </Paper>
        <Dialog open={open} onClose={()=>setOpen(!open)}>
          <DialogContent>
            <form>
              <TextField variant="outlined" label="contraseña" {...register("password",{required:"Completar este campo"})} fullWidth error={!!errors.password} color={errors.password ? "error" : "info"}/>
              <TextField variant="outlined" label="confirmar password" {...register("confirm",{required:"Completar este campo"})} fullWidth className="my-5"/>
            </form>
            <Box>
              <Stack direction="row">
                <IconButton>
                  {!errors.password ?
                  <CancelOutlinedIcon fontSize="small" color="error"/> : <CheckCircleOutlineOutlinedIcon/>
                  }
                  <Typography variant="body2" color="initial">Al menos 8 caracteres</Typography>
                </IconButton>
                <IconButton className="ml-auto">
                  <CancelOutlinedIcon fontSize="small" color="error"/>
                  <Typography variant="body2" color="initial">
                    1 mayúscula
                  </Typography>
                </IconButton>
              </Stack>
              <Stack direction="row" justifyContent="space-evently">
                <IconButton>
                  <CancelOutlinedIcon fontSize="small" color="error"/>
                  <Typography variant="body2" color="initial">
                  1 minúscula
                </Typography>
                </IconButton>
                <IconButton className="ml-auto">
                  <CancelOutlinedIcon fontSize="small" color="error"/>
                  <Typography variant="body2" color="initial">
                    1 número
                  </Typography>
                </IconButton>
              </Stack>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    )
}
const MisDatos=forwardRef((props,ref)=>{
  const[open,setOpen]=useState(false);
  const[data,setData]=useState({});
  useEffect(()=>{
    const fetchData=async()=>{
      const response=await fetch("http://localhost:4000/tokens");
      const dato=await response.json();
      setData(dato);
    }
    fetchData();
  },[])
  function handleBack(){
    document.getElementById("datos").scrollIntoView({behavior:"smooth",block:"center"})
    window.scrollTo(0,0)
  }
  return(
    <Container className="py-3 shrink-0 bg-gray-100" id="/perfil" ref={ref}>
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
                <Typography variant="body2" className="text-gray-500">{data.usuario}</Typography>
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
                <Typography variant="body2" className="text-gray-500">{data.telefono}</Typography>
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
            <form>
            <InputLabel htmlFor="nombre" className="font-bold">Nombre</InputLabel>
            <TextField color="primary" variant="outlined" value="Luis" type="text" fullWidth id="nombre"/>
            <InputLabel htmlFor="apellido" className="font-bold mt-5">Apellido</InputLabel>
            <TextField color="primary" variant="outlined" value="Gómez" type="text" id="apellido"/>
            <InputLabel htmlFor=" dni" className="font-bold mt-5">DNI</InputLabel>
            <TextField color="primary" variant="outlined" value="28280639" type="number" id="dni"/>
            <InputLabel htmlFor="telefono" className="font-bold mt-5">Teléfono</InputLabel>
            <TextField color="primary" variant="outlined" value="(11)5560-6321" type="text" id="telefono"/>
            </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" fullWidth>
            Guardar cambios
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
  )
})
const Datos = () => {
  const[open,setOpen]=useState(false)
  const miref=useRef()
  const opciones=["Datos personales","Autenticación","Direcciones","Salir"]
  function handleRouter(opcion){
    if(opcion==3){
      setOpen(!open)
      return
    }
    document.getElementById(opcion).scrollIntoView({behavior:"smooth",block:"center",inline:"center"})
    window.scrollTo(0,0)
  }
  return (
    <>
      <div className="flex overflow-hidden overflow-x-auto">
    <Container className="shrink-0" id="datos">
     <Box>
       <Typography variant="h6" color="initial" className="font-bold">Mis datos</Typography>
       <List>
        {
          opciones.map((option,index)=>(
          <ListItem key={index}>
              <ListItemButton onClick={()=>handleRouter(index)}>
              <ListItemText>
                <Typography variant="body1" color="initial" className="font-extrabold">{option}</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))
      }
    </List>
    </Box>
    </Container>
     <MisDatos ref={miref}/>
    </div>
    <Autenticacion/>
    <Direction/>
    <NewDirection/>
    <Dialog open={open} onClose={()=>setOpen(!open)}>
      <DialogContent>
        <Typography variant="body1" color="initial" className="p-10">Seguro quieres salir de tú cuenta?</Typography>
      </DialogContent>
      <DialogActions className="flex justify-center">
        <Button variant="contained" color="secondary">Cancelar</Button>
        <Button variant="contained" color="secondary" className="px-10">Salir</Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default Datos;