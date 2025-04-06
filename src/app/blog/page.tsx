"use client";
//import type { Metadata } from "next";
import { useEffect, useState } from "react";
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
  const[count,setCount]=useState(0);
  //const producto=JSON.parse(localStorage.getItem(localStorage.key(1));
  //producto["contador"]=count
   // localStorage.setItem(localStorage.key(1),producto)
    
    return (
        <>
            <Container>
              <h1>Largo:{localStorage.length}</h1>
            
                <Button variant="contained" color="info">
                    +
                </Button>
                <Button variant="contained" color="warning">-
                </Button>
            </Container>
        </>
    );
}

export default Blog;
