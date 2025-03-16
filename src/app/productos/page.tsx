"use client"
import {Box,Typography,Autocomplete,TextField,Container,Grid2,Card,CardMedia,CardContent,CardActions,Button,CardActionArea} from '@mui/material';
import Boton from '../Boton'
import Link from 'next/link'
import { useEffect, useState } from 'react';

const Productos= ({y})=>{
  const [data,setData]=useState([])
  useEffect(()=>{
      fetch(`https://fakestoreapi.com/${y}`)
      .then(response=>response.json())
      .then(data=>setData(data))
      .catch(error=>console.error("error al obtener los datos",error))
  },[])
  return(
    <>
    <Container>
    <Grid2 container spacing={2}>
     {
       data && data.map((prod,index)=>(
          <Grid2 size={{xs:6,sm:3}} key={index}>
            <Card sx={{width:"100%",height:"300px"}}
            elevation={12}
            >
            <Link href={`/description/${prod.id}`}>
              <CardMedia
              component="img"
              image={prod.image}
              height="150px"
              alt={prod.title}
              sx={{
                width:"50%",
                height:"50%",
                objectFit:"contain",
                margin:"10px auto",
                display:"block"
              }}
            
              />
              <CardContent>
                <Typography variant="body2" color="initial" className="truncate">{prod.title}</Typography>
                <Typography variant="body2" color="initial">{prod.price}</Typography>
              </CardContent>
              </Link>
              <CardActions>
                <Boton nombre={prod.title} producto={prod}/>
              </CardActions>
            </Card>
          </Grid2>
       ))
      
     }
     </Grid2>
    </Container>
    </>
    )
}
export default Productos;