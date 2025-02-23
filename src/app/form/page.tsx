
import {List,ListItem,ListItemButton,ListItemText,Typography,Container,Box,Button,IconButton} from "@mui/material"
export default function Form(){
  return(
    <Container className="py-3">
        <Typography variant="h6" color="initial">Datos personales</Typography>
      <Box className="bg-white py-3">
          <List>
            <ListItem>
              <ListItemText>
                <Typography variant="body1" color="initial" className="font-bold">Nombre</Typography>
                <Typography variant="body2" className="text-gray-500">Luis</Typography>
              </ListItemText>
              </ListItem>
                          <ListItem>
              <ListItemText>
                <Typography variant="body1" color="initial" className="font-bold">Apellido</Typography>
                <Typography variant="body2" className="text-gray-500">Gómez</Typography>
              </ListItemText>
              </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="body1" color="initial" className="font-bold">Email</Typography>
                <Typography variant="body2" className="text-gray-500">gomito724@gmail.com</Typography>
              </ListItemText>
              </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="body1" color="initial" className="font-bold">Dni</Typography>
                <Typography variant="body2" className="text-gray-500">28280639</Typography>
              </ListItemText>
              </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="body1" color="initial" className="font-bold">Teléfono</Typography>
                <Typography variant="body2" className="text-gray-500">1155606321</Typography>
              </ListItemText>
              </ListItem>
          </List>
          <Button variant="outlined" color="secondary" size="large" sx={{margin:"0 auto",display:"block"}}>Editar</Button>
      </Box>
      </Container>
  )
}