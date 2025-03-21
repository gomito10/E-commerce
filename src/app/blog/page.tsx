
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

  async function LoadData(){
    const response=await fetch("http://localhost:4000")
    const data=response.json()
    return data
  }
async function Blog() {
  const fetchFata=await LoadData()
    return (
        <>
            <Container>
              <Typography>{fetchFata.message}</Typography>
            </Container>
            
        </>
    );
}

export default Blog;
