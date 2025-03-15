'use client'

import {createContext,useState} from 'react';

const crearContexto=createContext();
function CountCart({children}){
  const[countCart,setCountCart]=useState(0);
  return(
      <>
        <crearContexto.Provider value={{countCart,setCountCart}}>
          {children}
        </crearContexto.Provider>
      </>
    )
}
export {crearContexto,CountCart};