'use client'

import {createContext,useEffect,useState} from 'react';

const crearContexto=createContext();
function CountCart({children}){
  const[countCart,setCountCart]=useState(0);
  const[token,setToken]=useState(null)
  const[refreshToken,setRefreshToken]=useState(null);
  return(
      <>
        <crearContexto.Provider value={{countCart,setCountCart,token,setToken,refreshToken,setRefreshToken}}>
          {children}
        </crearContexto.Provider>
      </>
    )
}
export {crearContexto,CountCart};