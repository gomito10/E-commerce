'use client'

import {Card,CardActionArea,CardMedia,CardContent,CardActions,Button,Grid2,Typography,Container} from "@mui/material";
import {useContext,useEffect,useState} from 'react';
import {crearContexto} from './crearContexto'
function Boton({nombre,producto}){
  const {countCart,setCountCart}=useContext(crearContexto)
  const[count,setCount]=useState(countCart)
  function handleStorage(){
    const addLocalStorage=localStorage.getItem(nombre)
    if(!addLocalStorage){
      localStorage.setItem(nombre,JSON.stringify
  (producto))
  localStorage.setItem("countCarrito",countCart+1)
  }
  }
  return(
   <>
     <Button variant="contained" color="error" fullWidth onClick={handleStorage}>
       Agregar {localStorage.getItem("countCarrito")}
     </Button>
          
      </>
  )
}

export default Boton;