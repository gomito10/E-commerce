'use client'

import {Card,CardActionArea,CardMedia,CardContent,CardActions,Button,Grid2,Typography,Container} from "@mui/material";
import {useRouter} from 'next/navigation'
function Boton({dato}){
const router=useRouter();
  function handleCard(id){
    router.push(`/productos/${id}`)
  }
  return(
   <>
            <Card sx={{height:"100%",width:"100%"}}>
            <CardActionArea onClick={()=>handleCard(dato.id)}>
              <CardMedia
              component="img"
              image={dato.image}
              height="150px"
              alt={dato.title}
              sx={{
                width:"50%",
                height:"150px",
                objectFit:"contain",
                margin:"10px auto",
                display:"block"
              }}
              
              />
              <CardContent>
                <Typography id="titulo">{dato.title}</Typography>
                <Typography variant="body1" color="initial" sx={{fontWeight:"bolder"}}>{dato.price}</Typography>
              </CardContent>
              </CardActionArea>
              <CardActions>
                <Button variant="contained" color="error" fullWidth>Comprar</Button>
              </CardActions>
            </Card>
      </>
  )
}

export default Boton;