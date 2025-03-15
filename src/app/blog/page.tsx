
//import type { Metadata } from "next";
import {
    Button,
    List,
    ListSubheader,
    ListItemText,
    ListItem,
    TextField,
    Container,
    Typography,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Box,
    Checkbox,
    Fab,
    ButtonGroup,
    Autocomplete,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
    Table,
    TableContainer,
    TableCell,
    TableRow,
    TableFooter,
    TableBody,
    TableHead,
    TableSortLabel,
    Grid2,
    AppBar,
    Toolbar,
    Paper,
    Badge,
    IconButton,
    Drawer,
    ListItemButton,
    ListItemSecondaryAction,
    Grow,
    Slide
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const names = ["luis", "maru", "mili", "leon", "cielo"];

function LoadProducts(){
  fetch("https://fakestoreapi.com/products")
  .then(response=>response.json())
  .then(data=>data)
  .catch(error=>console.error("Error en la solicitud",error.message))
}
  
async function Blog() {
  const productos=await LoadProducts();
    return (
        <>
            <Container>
              <ul>
              {
                productos.map((item)=>(
                  <li>{item.title}</li>
                ))
              }
              </ul>
            </Container>
            
        </>
    );
}

export default Blog;
