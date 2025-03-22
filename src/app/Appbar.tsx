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
function Aagregar({onSuma,onResta,miTotal}){
  const[count,setCount]=useState(1)
  const[total,setTotal]=useState(miTotal)
  function handleSuma(){
    setCount(c=>c+1)
    onSuma()
  }
  function handleResta(){
    if(count<=1){
      setCount(1)
    }else{
      setCount(count-1)
      onResta()
    }
    
  }
  useEffect(()=>{
    setTotal(miTotal*count)
  },[count,miTotal])
  return(
      <>
        <Box className="flex gap-2">
        <Button variant="outlined" size="small" color="secondary" onClick={()=>handleSuma()}>+</Button>
         <Typography>{count}</Typography>
        <Button variant="outlined" color="success" onClick={()=>handleResta()} size="small">-</Button>
        <Typography variant="h5" className="font-extrabold">${total && total.toFixed(2)}</Typography>
        </Box>
      </>
    )
}
function Appbar(){
  const[search,setSearch]=useState("");
  const[cart,setCart]=useState(0);
  const{countCart,setCountCart}=useContext(crearContexto)
  const[itemId,setItemId]=useState([])
  const[precio,setPrecio]=useState(null);
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
function handleResta(miTotal){
  setTotal(total-miTotal)
  if(total<1){
    setTotal(0)
  
  }
  
}
function handleSuma(miTotal){
  setTotal(total+miTotal)
}
useEffect(()=>{
  if(precios.length > 0){
    const suma=precios.filter(item=>typeof item === 'number');
  setTotal(suma.reduce((a,b)=>a+b,0))
  }else{
    setTotal(0)
  }
},[precios])
function handleCart(){
  localStorage.clear()
  setShow(!show)
  setCountCart(0)
}
function handleDelete(titulo,indice,valor){
  setItemId(itemId.filter((products,index)=>indice!==index));
  localStorage.removeItem(titulo)
  setTotal(t=>t-valor)
  setCountCart(countCart-1)
}
useEffect(()=>{
  for(let i=0; i<localStorage.length;i++){
    const items=JSON.parse(localStorage.getItem(localStorage.key(i)))
    array.push(items)
    misPrecios.push(items.price)
    
  }
  setItemId(array)
  setPrecios(misPrecios)
},[countCart])
function handleSearch(e){
  setSearch(e.target.value)
}
useEffect(()=>{
  const filtrar=categorias.find((item)=>item.startsWith(search.toLowerCase()));
  if(search){
    router.push(`/categorias/${filtrar}`)
  }
},[search])
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
            <Badge badgeContent={precios.length} onClick={handleShow}>
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
            image={item.image}
            sx={{
              width:"50%",
              height:"50%",
              objectFit:"contain",
              margin:"0 auto",
              float:"left"
            }}
            />
            <CardContent className="text-center">
              <Typography variant="body2" color="initial">{item.title}</Typography>
              <Typography variant="body1" sx={{fontWeight:"bold"}}>${item.price}</Typography>
              <DeleteOutlineIcon color="primary" onClick={()=>handleDelete(item.title,index,item.price)}/>
            </CardContent>
            <CardActions sx={{clear:"both"}}>
              <Aagregar onResta={()=>handleResta(item.price)} onSuma={()=>handleSuma(item.price)} miTotal={item.price}/>
            </CardActions>
            <Divider/>
          </Card>
        ))):<h1>No hay productos selecciionados</h1>
        }
        <Typography variant="h5" className="text-white bg-violet-700 w-full">Total: {total < 1 ? 0 : total.toFixed(2)}</Typography>
        </Box>
      </Drawer>

    </>
    )
}

export default Appbar;