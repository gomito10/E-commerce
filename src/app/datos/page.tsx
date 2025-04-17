"use client"
import {List,ListItem,ListItemButton,ListItemText,Typography,Container,Box,Button,IconButton,Grid2,Breadcrumbs,Paper,Dialog,DialogTitle,DialogContent,InputLabel,TextField,DialogActions,Stack,NativeSelect,FormControl,MenuItem} from "@mui/material"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {useRouter} from 'next/navigation'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Link from "next/link"
import {useRef,forwardRef,useState,useEffect,useContext} from "react";
import {crearContexto} from '../crearContexto'
import {useForm} from "react-hook-form"
 function NewDirection(){
   const{
     register
   }=useForm();
   const opciones=["Argentina"]
   return(
       <Container id="direction">
         <Box>
         <Typography variant="body1" color="initial" sx={{fontWeight:"bold",mt:1}}>Añadir dirección</Typography>
           <form>
            <FormControl fullWidth>
             <InputLabel sx={{fontWeight:"bold"}}>País</InputLabel>
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
           <InputLabel color="success" variant="outlined">Código postal</InputLabel>
           <TextField {...register("postal")} variant="outlined" color="primary"/>
           <Link href="#" className="my-5">
             <Typography variant="body2" color="primary">No conozco mi código postal</Typography>
           </Link>
           <InputLabel htmlFor="calle" sx={{fontWeight:"bold",mt:1}}>Calle</InputLabel>
           <TextField variant="outlined" color="primary" fullWidth id="calle"/>
           <InputLabel htmlFor="numero" sx={{fontWeight:"bold",mt:1}}>Número</InputLabel>
           <TextField variant="outlined" color="primary" fullWidth id="numero"/>
           <InputLabel htmlFor="informacion" sx={{fontWeight:"bold",mt:1}}>Información adicional (ej. apto.201)</InputLabel>
           <TextField variant="outlined" color="primary" fullWidth id="informacion"/>
           <InputLabel htmlFor="provincia" sx={{fontWeight:"bold"}}>Provincia</InputLabel>
           <NativeSelect
           inputProps={{
             name:"provincia",
             id:"provincia"
           }}
           >
             <option value="Buenos Aires">Bienos Aires</option>
             <option value="Mendoza">Mendoza</option>
           </NativeSelect>
           <InputLabel htmlFor="ciudad" className="font-bold">Ciudad</InputLabel>
           <NativeSelect
           inputProps={{
             name:"ciudad",
             id:"ciudad"
           }}
           >
             <option value="Rafael Castillo">Rafael Castillo</option>
             <option value="Merlo">Merlo</option>
           </NativeSelect>
           <Button variant="contained" color="secondary" fullWidth size="large">Guardar dirección</Button>
           <Button variant="outlined" color="secondary" fullWidth size="large">Borrar dirección</Button>
           </form>
         </Box>
       </Container>
     )
 }
const Direction=forwardRef((props,ref)=>{
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
  function handleBack(){
    document.getElementById("datos").scrollIntoView({
      behavior:"auto",
      block:"end"
    });
    window.scrollTo(0,0)
  }
  return(
      <Container ref={ref} className="shrink-0">
        <IconButton onClick={handleBack}>
          <KeyboardBackspaceIcon color="secondary"/>
          <Typography variant="body2" color="secondary">Volver</Typography>
        </IconButton>
        <Typography variant="body1" color="initial" className="font-bold">Direcciones</Typography>
        <Button variant="contained" color="secondary" className="my-10" onClick={()=>setOpen(!open)}>Agregar dirección</Button>
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
            <Typography variant="body1" className="font-bold">Añadir dirección</Typography>
          </DialogTitle>
          <DialogContent>
            <Paper elevation={7}>
              <NewDirection/>
            </Paper>
          </DialogContent>
        </Dialog>
      </Container>
    )
})
const Autenticacion=forwardRef((props,ref)=>{
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
function handleBack(){
    document.getElementById("datos").scrollIntoView({behavior:"auto",block:"center"})
    window.scrollTo(0,0)
}
async function onSubmit(data){
  try{
    const response=await fetch("http://localhost:4000/change-password",{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify(data)
    });
    if(!response.ok){
      const result=await response.json();
      console.log(result.error)
      return
    }
    const result=response.json();
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
    alert("Error en el servidor al Modificar la contraseña")
  }
}
  return(
      <Container ref={ref} className="shrink-0">
        <IconButton color="secondary" onClick={handleBack}>
          <KeyboardBackspaceIcon/>
          <Typography color="secondary">Volver</Typography>
        </IconButton>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField variant="outlined" label="contraseña actúal" {...register("currentPassword",{required:"Completar este campo"})} fullWidth error={!!errors.currentPassword} color={errors.password ? "error" : "info"} helperText={errors.currentPassword && errors.currentPassword.message} error={!!errors.currentPassword}/>
              <TextField variant="outlined" label="contraseña" {...register("newPassword",{required:"Completar este campo",minLength:{
                value:8,
                message:"Debe contener entre 8 y 20 caracteres"
              },
                maxLength:{
                value:20,
                message:"Debe contener entre 8 y 20 caracteres"
              },
                pattern:{
                  value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%+?&])[A-Za-z\d@$!%+?&]{0,}$/,
                  message:"La contraseña debe tener al menos 1 mayuscula,una minuscula,un numero y un caracter especial"
                }
              })} sx={{margin:"10px 0"}} fullWidth helperText={errors.newPassword && errors.newPassword.message} error={!!errors.newPassword} color={errors.newPassword ? "error" : "primary"}/>
              <TextField variant="outlined" label="confirmar password" {...register("confirmPassword",{required:"Completar este campo"})} fullWidth className="my-5" helperText={errors.confirmPassword && errors.confirmPassword.message}  error={!!errors.confirmPassword} color={errors.confirmPassword ? "error" : "primary"}/>
              <Button type="submit" variant="contained" color="secondary" fullWidth>Modificar contraseña</Button>
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
})
const MisDatos=forwardRef((props,ref)=>{
  const[open,setOpen]=useState(false);
  const[data,setData]=useState({});
  const{token}=useContext(crearContexto)
  //const[nombre,setNombre]=useState("")
  const[name,setName]=useState(data?.username || "");
  const[apellido,setApellido]=useState(data?.apellido || "");
  const[email,setEmail]=useState(data?.email|| "");
  const[documento,setDocumento]=useState(data?.dni || "");
  const[tel,setTel]=useState(data?.tel || "");
  const[update,setUpdate]=useState(0)
  const{register,watch,handleSubmit,formState:{errors},setError}=useForm()
  const router=useRouter()
  const fetchData=async ()=>{
    try{
    const response=await fetch("http://localhost:4000/datos",{
      method:"GET",
      headers:{
        Authorization:`Bearer ${token}`,
        "Cache-Control":"no-cache",
      }
    });
    const result=await response.json();
    setData(result)
    setName(result.username)
    setApellido(result.apellido)
    setEmail(result.email)
    setTel(result.tel)
    setDocumento(result.documento)
    }catch(error){
      console.error("Error de usuario en datos")
    }
    }
  function handleBack(){
    document.getElementById("datos").scrollIntoView({behavior:"auto",block:"center"})
    window.scrollTo(0,0)
  }
 async function onSubmit(data){
   try{
    const response=await fetch("http://localhost:4000/datos",{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify(data)
    })
    
    const result=await response.json();
    if(!response.ok){
      if(result.error){
        alert("El correo ya se encuentra registrado con otro usuario")
      return
      }
    }
    
    if(result.errors){
        result.errors.forEach((error)=>{
          setError(error.path,{
            type:"manual",message:error.msg
          })
        })
      }else{
    //setData(result)
    alert("Datos modificados correctamente")
    console.log(data);
    setOpen(!open)
      }
 }catch(error){
   alert("Error en el servidor al enviar los datos para actualización")
 }
}
  useEffect(()=>{
    fetchData()
  },[])
 
 
  const usuario=watch("username")
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
                <Typography variant="body2" className="text-gray-500" >{name}</Typography>
              </ListItemText>
              </ListItem>
                          <ListItem>
              <ListItemText>
                <Typography variant="body1" color="initial" className="font-bold">Apellido</Typography>
                <Typography variant="body2" className="text-gray-500">{apellido}</Typography>
              </ListItemText>
              </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="body1" color="initial" className="font-bold">Email</Typography>
                <Typography variant="body2" className="text-gray-500">{email}</Typography>
              </ListItemText>
              </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="body1" color="initial" className="font-bold">Dni</Typography>
                <Typography variant="body2" className="text-gray-500">{documento}</Typography>
              </ListItemText>
              </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="body1" color="initial" className="font-bold">Teléfono</Typography>
                <Typography variant="body2" className="text-gray-500">{tel}</Typography>
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
            
            <TextField color="primary" variant="outlined" type="text" fullWidth id="nombre" {...register("nombre")} value={name} onChange={(e)=>setName(e.target.value)}
            helperText={errors.nombre && errors.nombre.message}
            error={!!errors.nombre}
            color={errors.nombre ? "error" : "primary"}
            />
            <InputLabel htmlFor="apellido" className="font-bold mt-5">Apellido</InputLabel>
            <TextField color="primary" variant="outlined" value={apellido} type="text" id="apellido" {...register("apellido")} onChange={(e)=>setApellido(e.target.value)}
            helperText={errors.apellido && errors.apellido.message}
            error={!!errors.apellido}
            color={errors.apellido ? "error" : "primary"}
            />
            <InputLabel htmlFor="email" className="font-bold mt-5">Email</InputLabel>
            <TextField color="primary" variant="outlined" value={email} type="email" id="email" {...register("email",{pattern:{
              value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message:"Formato no valido"
            }})} onChange={(e)=>setEmail(e.target.value)}
            helperText={errors.email && errors.email.message}
            error={!!errors.email}
            color={errors.email ? "error" : "primary"}
            />
            <InputLabel htmlFor=" dni" className="font-bold mt-5">DNI</InputLabel>
            <TextField color="primary" variant="outlined" value={documento} type="number" id="dni" {...register("dni")} readOnly
            />
            {data.error}
            <InputLabel htmlFor="telefono" className="font-bold mt-5">Teléfono</InputLabel>
            <TextField color="primary" variant="outlined" value={tel} type="text" id="telefono" {...register("telefono")} onChange={(e)=>setTel(e.target.value)} type="number" helperText={errors.telefono && errors.telefono.message} error={!!errors.telefono} color={errors.telefono ? "error" : "primary"}/>
            <Button variant="contained" color="secondary" fullWidth type="submit">
            Guardar cambios
          </Button>
            </form>
        </DialogContent>
      </Dialog>
      </Container>
  )
})
const Datos = () => {
  const[open,setOpen]=useState(false)
  const miref=useRef()
  const refAutentication=useRef()
  const refDirection=useRef()
  const opciones=["Datos personales","Autenticación","Direcciones","Saklir"]
  function handleRouter(opcion){
    if(opcion==3){
      setOpen(!open)
      return
    }
    if(opcion===0){
    miref.current.scrollIntoView({behavior:"auto",block:"center",inline:"center"})
    window.scrollTo(0,0)
    }
    if(opcion==1){
      refAutentication.current.scrollIntoView({behavior:"auto",block:"center",inline:"center"})
    window.scrollTo(0,0)
    }
 if(opcion==2){
      refDirection.current.scrollIntoView({behavior:"auto",block:"center",inline:"center"})
    window.scrollTo(0,0)
  
  }
  }
  return (
    <>
      <div className="flex overflow-hidden">
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
     <Autenticacion ref={refAutentication}/>
     <Direction ref={refDirection}/>
    </div>

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