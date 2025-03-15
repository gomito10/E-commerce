import {Card,CardMedia,CardContent,CardActions,Typography,Button,Divider,IconButton,Container,CardActionArea,Box,Grid2,Paper} from '@mui/material';
import Productos from '../../productos/page'
import Link from 'next/link'
import Image from "next/image"
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import Boton from '../../Boton'
async function LoadDescription(id){
  const response=await fetch(`https://fakestoreapi.com/products/${id}`)
  const data=await response.json()
  return data
}
async function LoadVistos(vistos){
  const response=await fetch(`https://fakestoreapi.com/products/category/${vistos}`)
  const data=await response.json()
  return data
}
async function Description({params}){
  const product= await LoadDescription(params.descriptionId)
  const seleccion=await LoadVistos(product.category)
  return(
    <>
    <Container>
    <Box sx={{width:"50%",height:"50%",margin:"50px auto",display:"block"}}>
      <Image
      src={product.image}
      width={50}
      height={50}
      layout="responsive"
      priority
      alt={product.title}
      />
      </Box>
      <Typography variant="h5" className="font-bold">{product.title}</Typography>
      <Typography variant="body2" color="initial">Vendido por <Typography variant="body2" color="primary" component="span">CityTour</Typography></Typography>
      <Divider/>
      <Box>
        <Typography variant="body2" color="initial" className="font-bold my-4">¡Nuestras promociones!</Typography>
        <Typography variant="body2" component="p" className="text-green-700 mb-4">18 <Typography variant="body2" component="span" color="initial"> cuotas</Typography><Typography variant="body2" component="span" className="text-green-700"> sin interés</Typography></Typography>
      </Box>
      </Container>
      <Divider/>
      <Container>
      <Box>
        <IconButton>
          <LocalShippingOutlinedIcon/>
          <Typography variant="body2" sx={{ml:2}}>Envío GRATIS <Typography variant="body2" color="primary" component="span"> a Buenos Aires (1755)</Typography></Typography>
        </IconButton>
        <IconButton>
          <StorefrontOutlinedIcon/>
          <Box sx={{display:"flex",flexDirection:"column",ml:2}}>
          <Box>
          <Typography variant="body2" color="initial">Retiro GRATIS en sucursal
          <Typography variant="body1" className="text-green-700" component="span">  ¡Retiralo YA!</Typography>
          </Typography>
          </Box>
          <Typography variant="body2" color="primary" sx={{mr:"auto"}}>Ver sucursales</Typography>
          </Box>

        </IconButton>
      </Box>
      </Container>
      <Box className="bg-gray-100" sx={{width:"100%"}}>
        <Typography variant="body1" color="initial" className="font-bold m-4">Personas interesadas en este producto también vieron</Typography>
          <Box sx={{display:"flex",overflow:"hidden",overflowX:"auto"}} className="bg-gray-100">
            <Productos y={`products/category/${product.category}`}/>
        </Box>
      <Typography variant="h5" className="font-bold text-center my-4" color="inigial">Descripción</Typography>
      <Typography variant="body1" color="initial" sx={{textAlign:"center"}} className="m-5">
        {product.description}
      </Typography>
    </Box>
    <Box>
      <Container className="fixed bottom-0 bg-white">
        <Paper>
        <Typography variant="h4" color="initial" className="font-bold">${product.price}</Typography>
        <Typography variant="body2" className="text-green-700">18 cuotas sin interés de ${(product.price/18).toFixed(2)}</Typography>
      <Button variant="contained" color="secondary" fullWidth sx={{margin:"10px 0"}} size="large">Comprar</Button>
      <Boton nombre={product.title} producto={product}/>
      </Paper>
      </Container>
    </Box>
    </>
  )
}

export default Description;