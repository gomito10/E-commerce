'use client'

import {createContext,useEffect,useState} from 'react';

const crearContexto=createContext();
function CountCart({children}){
  const[countCart,setCountCart]=useState(JSON.parse(localStorage.getItem("carrito")));
  const[token,setToken]=useState(null)
  const[refreshToken,setRefreshToken]=useState(null);
  const[precioTotal,setPrecioTotal]=useState(JSON.parse(localStorage.getItem("pagar"))||0);
  return(
      <>
        <crearContexto.Provider value={{countCart,setCountCart,token,setToken,refreshToken,setRefreshToken,precioTotal,setPrecioTotal}}>
          {children}
        </crearContexto.Provider>
      </>
    )
}
export {crearContexto,CountCart};