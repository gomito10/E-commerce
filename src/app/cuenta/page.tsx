"use client"
import {useEffect,useState} from "react"
import {Card,CardHeader,CardContent,CardActions,Typography,Container,Button,Link,IconButton,Box, Grid2} from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import {usePathname} from "next/navigation"
const Cuenta = () => {
  const pathname=usePathname();
  return (
    <Container className="bg-gray-100">
      <Typography>{pathname}</Typography>
    <Typography variant="h5" className="font-extrabold mb-4 pt-5">Mi Cuenta</Typography>
    <Grid2 container spacing={1}>
      <Grid2 size={{xs:12,sm:4}}>
    <Card>
      <CardContent className="flex">
        <Box sx={{borderRadius:"50%"}}>
        <IconButton className="bg-gray-200">
      <AccountCircleOutlinedIcon color="secondary" fontSize="large"/>
      </IconButton>
      </Box>
        <Box sx={{ml:1}}>
          <Typography variant="body1" color="initial" className="font-extrabold">Mis datos</Typography>
          <Typography variant="body1" color="initial">
          Edita tus datos personales,tus direcciones,tus tarjetas y contraseñas.
          </Typography>
          <Link href="/datos" underline="none">Ir a Mis datos</Link>
        </Box>
      </CardContent>

    </Card>
    </Grid2>
      <Grid2 size={{xs:12,sm:4}}>
        <Card>
      <CardContent className="flex">
        <Box sx={{borderRadius:"50%"}}>
        <IconButton className="bg-gray-200">
      <ShoppingBagOutlinedIcon color="secondary" fontSize="large"/>
      </IconButton>
      </Box>
        <Box sx={{ml:1}}>
          <Typography variant="body1" color="initial" className="font-extrabold">Mis compras</Typography>
          <Typography variant="body1" color="initial">
           Seguí el estado de tus compras y
           consultá tus facturas
          </Typography>
          <Link href="#" underline="none">Ir a Mis compras</Link>
        </Box>
      </CardContent>

    </Card>
    </Grid2>
    <Grid2 size={{xs:12,sm:4}}>
        <Card>
      <CardContent className="flex">
        <Box sx={{borderRadius:"50%"}}>
        <IconButton className="bg-gray-200">
      <QuestionMarkOutlinedIcon color="secondary" fontSize="large"/>
      </IconButton>
      </Box>
        <Box sx={{ml:1}}>
          <Typography variant="body1" color="initial" className="font-extrabold">Centro de ayuda</Typography>
          <Typography variant="body1" color="initial">
          Realiza consultas y reclamos.
          Contactanos para poder ayudarte.
          </Typography>
          <Link href="#" underline="none">Ir al centro de ayuda</Link>
        </Box>
      </CardContent>

    </Card>
    </Grid2>
    </Grid2>
    </Container>
  )
}

export default Cuenta;