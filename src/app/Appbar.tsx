'use client'
import {useState,useEffect} from 'react'
import {AppBar,Toolbar,Typography,IconButton,TextField,Box,Drawer,ListSubheader,List,ListItem,ListItemButton,ListItemText,ListItemSecondaryAction,Badge} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link'
import {useRouter} from 'next/navigation';
function Appbar(){
  const[open,setOpen]=useState(false);
  const router=useRouter();
  const categorias=["electronics","jewelery","men's clothing","women's clothing"];
const[show,setShow]=useState(false);
const[cart,setCart]=useState(localStorage.length);
function handleShow(){
  setShow(!open);
}
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
            <Badge badgeContent={cart} onClick={handleShow}>
            <ShoppingCartOutlinedIcon/>
            </Badge>
          </IconButton>
          </Box>
          <TextField variant="outlined" color="success" fullWidth/>
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
            <ListItemButton onClick={()=>setOpen(!open)}>
            <Link href='categorias/[item]' as={`/categorias/${item}`}>
              <ListItemText secondary={item}/>
              <ListItemSecondaryAction>
                <IconButton>
                  <NavigateNextIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </Link>
            </ListItemButton>
            </ListItem>
            ))
            }
        </List>
      </Drawer>
      <button onClick={()=>localStorage.clear()}>click</button>
      <Drawer open={show} onClose={()=>setShow(!show)}>
        <List>
          
            <ListItem>
              {
                
              }
            </ListItem>
          
        </List>
      </Drawer>
    </>
    )
}

export default Appbar;