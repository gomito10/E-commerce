import {Grid2,Card,CardMedia,CardContent,Typography,Button,CardActions,Container} from "@mui/material";
import Link from 'next/link'
async function loadCategory(category){
  const response=await fetch(`https://fakestoreapi.com/products/category/${category}`)
  const data=await response.json()
  return data
}

async function CategoriaId({params}){
  const products=await loadCategory(params.categoriaId);
  return(
    <>
    <Container>
    <Grid2 container spacing={2} sx={{mt:2}}>
    {
    products.map((item)=>(
    <Grid2 size={{xs:6,sm:3}}>
    <Card sx={{width:"100%",height:"300px"}} elevation={12}>
     <Link href={`/description/${item.id}`}>
      <CardMedia 
      component="img"
      image={item.image}
      height="150px"
      alt={item.title}
      sx={{
        width:"50%",
        height:"50%",
        objectFit:"contain",
        margin:"10px auto",
        display:"block"
      }}
      />
      <CardContent>
        <Typography variant="body2" color="initial" className="truncate">{item.title}</Typography>
        <Typography variant="body2" color="initial" className="bolder">{item.price}</Typography>
      </CardContent>
      </Link>
      <CardActions>
        <Button variant="contained" color="error" fullWidth>Agregar</Button>
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

export default CategoriaId;