'use client'

import {Card,CardActionArea,CardMedia,CardContent,CardActions,Button,Grid2,Typography,Container} from "@mui/material";

function Boton({producto,id}){
  function handleStorage(){
    localStorage.setItem(producto,JSON.stringify(id))
  }
  return(
   <>
     <Button variant="contained" color="success" fullWidth onClick={handleStorage}>
       Agregar
     </Button>
          
      </>
  )
}

export default Boton;