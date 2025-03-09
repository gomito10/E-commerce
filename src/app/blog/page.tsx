"use client";
//import type { Metadata } from "next";
import {
    useState,
    useRef,
    useEffect,
    forwardRef,
    createContext,
    useContext
} from "react";
import { useForm } from "react-hook-form";
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


  
function Blog() {
  const[carro,setCarro]=useState("");
    return (
        <>
            <Container>
              <button onClick={()=>localStorage.setItem("carro","producto")}>click</button>
              <button onClick={()=>setCarro(localStorage.getItem("cart"))}>obtener</button>
              <h1>{carro}</h1>
            </Container>
            
        </>
    );
}

export default Blog;
