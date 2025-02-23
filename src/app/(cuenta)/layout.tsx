'use client'

import {useState} from 'react'

export default function Layout({children}){
  const[name,setName]=useState("");
  return (
    <>
      <h1>probando formularios</h1>
      {children}
      <label htmlForm="nombre">Nombre</label>
      <input id="nombre" name="nombre" type="text" placeholder="usuario" onChange={(e)=>setName(e.target.value)} value={name}/>
  
    </>
  )
}