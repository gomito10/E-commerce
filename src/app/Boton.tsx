'use client'

import {Card,CardActionArea,CardMedia,CardContent,CardActions,Button,Grid2,Typography,Container} from "@mui/material";
import {useContext,useEffect,useState} from 'react';
import {crearContexto} from './crearContexto'
function Boton({nombre,producto,precio}){
  const[contador,setContador]=useState(1);
  const {countCart,setCountCart,precioTotal,setPrecioTotal}=useContext(crearContexto);
  //const[miArray,setMiArray]=useState([]);
  const[count,setCount]=useState(0)
  function handleStorage(){
    const addLocalStorage=localStorage.getItem(nombre)
    if(!addLocalStorage){
      localStorage.setItem(nombre,JSON.stringify
  ({datos:producto,contador:count,total:precio}))
  setCountCart(c=>c+1)
  setCount(count+1)
  setPrecioTotal(t=>{
    const nuevoValor=t+precio;
    localStorage.setItem("pagar",JSON.stringify(nuevoValor));
    return nuevoValor;
  },[countCart,precioTotal]);
  //JSON.parse(localStorage.getItem("carrito"))+1
  }
  }
  useEffect(()=>{
    localStorage.setItem("carrito",JSON.stringify(countCart))
    localStorage.setItem("pagar",JSON.stringify(precioTotal))
    //localStorage.setItem("contador",{contador:count})
  },[countCart])
useEffect(()=>{
  localStorage.setItem("pagar",JSON.stringify(precioTotal))
},[])
  return(
   <>
     <Button variant="contained" color="error" fullWidth onClick={handleStorage}>
       Agregar
     </Button>
      </>
  )
}

export default Boton;