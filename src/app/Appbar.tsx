'use client'
import {useState,useEffect,useContext} from 'react'
import {AppBar,Toolbar,Typography,IconButton,TextField,Box,Drawer,ListSubheader,List,ListItem,ListItemButton,ListItemText,ListItemSecondaryAction,Badge,Card,CardMedia,CardContent,CardActions,Button,Divider,Stack} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link'
import {useRouter} from 'next/navigation';
import {crearContexto} from './crearContexto';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
function Aagregar({onSuma,onResta,miTotal,miProducto}){
  const{precioTotal,setPrecioTotal}=useContext(crearContexto);
  const[count,setCount]=useState(JSON.parse(localStorage.getItem(miProducto))?.contador||1)
  const[totales,setTotales]=useState(JSON.parse(localStorage.getItem(miProducto))?.total||miTotal)
  const array=[];
  //const{precioTotal,setPrecioTotal}=useContext(crearContexto);
  function handleSuma(){
    setCount(c=>{
      const nuevoValor=c+1;
      return nuevoValor;
    })
setTotales(t=>{
      const nuevoTotal=t+miTotal;
      return nuevoTotal;
    })
    const nuevoValor=count+1;
    const nuevoTotal=totales+miTotal;
    localStorage.setItem(miProducto,JSON.stringify({"contador":nuevoValor,"total":nuevoTotal}))
  onSuma()
   // localStorage.setItem("contador",)
    //setPrecioTotal(t=>t+miTotal)
  }
  function handleResta(){
    if(count<=1){
      setCount(1)
    }else{
      setCount(c=>{
        const nuevoValor=c-1;
        return nuevoValor
      })
      setTotales(t=>{
        const nuevoTotal=t-miTotal;
        return nuevoTotal;
      })
      const nuevoValor=count-1;
      const nuevoTotal=totales-miTotal;
      localStorage.setItem(miProducto,JSON.stringify({"contador":nuevoValor,"total":nuevoTotal}))
      onResta()
      //setPrecioTotal(t=>t-miTotal)
    }
    
  }
  useEffect(()=>{
    localStorage.setItem(miProducto,JSON.stringify({"contador":count,"total":totales}))
    
  },[count,totales])

  return(
      <>
        <Box className="flex gap-2">
        <Button variant="outlined" size="small" color="secondary" onClick={()=>handleSuma()}>+</Button>
         <Typography>{JSON.parse(localStorage.getItem(miProducto))?.contador||1}</Typography>
        <Button variant="outlined" color="success" onClick={()=>handleResta()} size="small">-</Button>
        <Typography variant="h5" className="font-extrabold">${JSON.parse(localStorage.getItem(miProducto))?.total.toFixed(2)||miTotal}</Typography>
        </Box>
      </>
    )
}
function Appbar(){
  const[search,setSearch]=useState("");
  const[cart,setCart]=useState(0);
  const{countCart,setCountCart,precioTotal,setPrecioTotal}=useContext(crearContexto)
  const[itemId,setItemId]=useState([])
  const[open,setOpen]=useState(false);
  const router=useRouter();
  const categorias=["electronics","jewelery","men's clothing","women's clothing","Todos los productos"];
const[show,setShow]=useState(false);
const[precios,setPrecios]=useState([])
const[total,setTotal]=useState(0)
const array=[];
const misPrecios=[]
function handleShow(){
  
  setShow(!show);
  
}
function handleCategory(id){
  setOpen(!open)
  if(id!=="Todos los productos"){
    router.push(`/categorias/${id}`)
  }else{
    router.push("/")
  }
}
function handleSuma(miTotal){
  setPrecioTotal(c=>{
    const nuevoValor=c+miTotal;
    localStorage.setItem("pagar",JSON.stringify(nuevoValor))
    return nuevoValor;
  })
}
function handleResta(miTotal){
  if(precioTotal<1){
    setPrecioTotal(0)
  }else{
    setPrecioTotal(t=>{
      const nuevoValor=t-miTotal;
      localStorage.setItem("pagar",JSON.stringify(nuevoValor));
      return nuevoValor;
    })
  }
  
}
{/*useEffect(()=>{
  if(precios.length > 0){
    const suma=precios.filter(item=>typeof item === 'number');
  setTotal(suma.reduce((a,b)=>a+b,0))
  }else{
    setTotal(0)
  }
},[precios])*/}
function handleCart(){
  localStorage.clear()
  setShow(!show)
  setCountCart(0)
  setPrecioTotal(0)
}
function handleDelete(titulo,indice,valor){
  setItemId(itemId.filter((products,index)=>indice!==index));
  localStorage.removeItem(`item-${titulo}`)
  setPrecioTotal(t=>t-valor)
  setCountCart(c=>c-1)
}

function handleSearch(e){
  setSearch(e.target.value)
}
useEffect(()=>{
  const filtrar=categorias.find((item)=>item.startsWith(search.toLowerCase()));
  if(search){
    router.push(`/categorias/${filtrar}`)
  }
},[search])
useEffect(()=>{
  for(let i=0;i<localStorage.length;i++){
    const items=localStorage.getItem(localStorage.key(i))
    if(localStorage.key(i).startsWith("item")){
      array.push(JSON.parse(items));
      misPrecios.push(items.price);
  }else{
    continue;
  }
  }
  setItemId(array)
  setPrecios(misPrecios)
},[localStorage.length])
useEffect(()=>{
  localStorage.setItem("pagar",JSON.stringify(precioTotal.toFixed(2)))
},[precioTotal])
  return(
    <>
      <AppBar position="static" sx={{backgroundColor:"white"}}>
        <Toolbar>
        <Box sx={{display:"flex",flexDirection:"column",width:"100%",m:1}}>
        <Box sx={{display:"flex",alignItems:"center",width:"100%"}}>
          <IconButton onClick={()=>setOpen(!open)}>
            <MenuOutlinedIcon/>
          </IconButton>
          <IconButton sx={{marginLeft:"auto"}} onClick={()=>router.push("/cuenta")}>
            <AccountCircleOutlinedIcon/>
          </IconButton>
          <Typography variant="body1" color="initial">Mi Cuenta</Typography>
          <IconButton>
            <Badge badgeContent={localStorage.getItem("carrito")} onClick={handleShow}>
            <ShoppingCartOutlinedIcon/>
            </Badge>
          </IconButton>
          </Box>
          <TextField variant="outlined" color="success" fullWidth onChange={handleSearch} value={search}/>
          </Box>
        </Toolbar>
      </AppBar>
            <Drawer open={open} onClose={()=>setOpen(!open)}
            PaperProps={{
              sx:{
                width:"75%"
              }
            }}
            >
        <List>
          <ListSubheader>Categorias</ListSubheader>
          {
          categorias.map((item,index)=>(
            <ListItem key={index}>
            <ListItemButton onClick={()=>handleCategory(item)}>
              <ListItemText secondary={item}/>
              <ListItemSecondaryAction>
                <IconButton>
                  <NavigateNextIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemButton>
            </ListItem>
            ))
            }
        </List>
      </Drawer>
      <Drawer open={show} onClose={()=>setShow(!show)}
      PaperProps={{
        sx:{
          width:"75%",
        }
      }}
      >
        <Box sx={{overflowY:"auto"}}>
          <Stack spacing={1} direction="row" justifyContent="space-between">
          <IconButton onClick={handleCart}>
            <DeleteOutlineIcon/>
            <Typography variant="body1" color="primary">Vaciar carrito</Typography>
          </IconButton>
          <IconButton edge="starr" onClick={()=>setShow(!show)}>
            <CloseIcon/>
          </IconButton>
          </Stack>
          <Divider/>
        {
        localStorage.length > 0 ? (itemId.map((item,index)=>(
          <Card elevation={0} key={index} sx={{width:"100%",height:"250px"}}>
            <CardMedia 
            component="img"
            height="150px"
            image={item.datos.image}
            sx={{
              width:"50%",
              height:"50%",
              objectFit:"contain",
              margin:"0 auto",
              float:"left"
            }}
            />
            <CardContent className="text-center">
              <Typography variant="body2" color="initial">{item.datos.title}</Typography>
              <Typography variant="body1" sx={{fontWeight:"bold"}}>${item.datos.price}</Typography>
              <DeleteOutlineIcon color="primary" onClick={()=>handleDelete(item.datos.title,index,item.dagos.price)}/>
            </CardContent>
            <CardActions sx={{clear:"both"}}>
              <Aagregar onResta={()=>handleResta(item.datos.price)} miTotal={item.datos.price} miProducto={item.datos.title} onSuma={()=>handleSuma(item.datos.price)}/>
            </CardActions>
            <Divider/>
          </Card>
        ))):<h1>No hay productos selecciionados</h1>
        }
        <Typography variant="h5" className="text-white bg-violet-700 w-full">Total: {JSON.parse(localStorage.getItem("pagar"))||0}</Typography>
        </Box>
      </Drawer>

    </>
    )
}

export default Appbar;