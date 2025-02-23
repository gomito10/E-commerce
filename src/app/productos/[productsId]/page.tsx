import {Card,CardMedia,CardContent,Typography,Container} from '@mui/material'
async function description(descripcion){
  const response=await fetch(`https://fakestoreapi.com/products/${descripcion}`)
  const data= await response.json();
  return data;
}

async function ProductsId({params}){
  const producto=await description(params.productsId);
  return(
    <>
    <Container>
      <Card id="description">
        <CardMedia
        component="img"
        image={producto.image}
        height="150px"
        alt={producto.title}
        id="description_image"
        />
        <CardContent sx={{textAlign:"center"}}>
          <Typography variant="body1" color="initial">{producto.title}</Typography>
          <Typography variant="body1" color="initial">{producto.price}</Typography>
        </CardContent>
      </Card>
      </Container>
    </>
    
  )
}
export default ProductsId;