"use client"
import {Button} from '@mui/material';
import {useRouter} from 'next/navigation';
import {useState,useContext} from "react";
import {crearContexto} from "./crearContexto"
function Compra(){
  const{token,refreshToken}=useContext(crearContexto);
  const router=useRouter();
  function handleClick(){
const getProtecredData=async ()=>{
        try{
    const response=await fetch("http://localhost:4000/compras",{
      method:"GET",
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    if(response.status===400){
      router.push("/login")
      return
    }
    if(response.status===403){
      const refreshResponse=await fetch("http://localhost:4000/refreshToken",{
        method:"POST",
        headers:{
          Authorization:`Bearer ${refreshToken}`
        },
      });
      if(refreshResponse.ok){
        const result=await refreshResponse.json();
        setToken(result.accessToken);
        setRefreshToken(result.refreshToken)
        const retryResponse=await fetch("http://localhost:4000/compras",{
          method:"GET",
          headers:{
            Authorization:`Bearer ${result.accessToken}`
          }
        });
        if(retryResponse.ok){
          const data=await retryResponse.json();
          console.log("Datos protegidos despues de renovar el Token",data);
          router.push("/compras");
          return
        }else{
          console.log("No se puede acceder despues denovar el token")
        router.push("/login");
        return
      }
      }else{
        console.log("Error al refrescar token");
        router.push("/login")
      }
    }
    const data=await response.json();
    console.log("Datos protegidos",data);
    router.push("/compras")
  }catch(error){
    console.error("Error en la solicitud a la ruta protegida",error.message)
  }
    
  }
  getProtecredData()
  }
  return(
     <>
       <Button variant="contained" color="error" fullWidth onClick={handleClick} className="my-2">Comprar:{token && token}</Button>
     </>
    )
}
export default Compra;