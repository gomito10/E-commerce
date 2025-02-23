'useClient'
import {Box,Typography,Container} from '@mui/material';
import {React} from 'react'
function Footer(){
  return(
    <>
    <Container sx={{mt:2}}>
      <Typography variant="h4" color="initial" className="font-bold" sx={{fontStyle:"italic"}}>CITYTOUR</Typography>
      <Box>
      <Box component="section">
        <Typography variant="body1" color="initial">Atención al cliente:</Typography>
        <Typography component="pre" variant="body1" color="initial" className="font-bold">0800 123 0338</Typography>
        <Typography variant="body1" color="initial" className="font-bold" component="pre">0810 999 3758</Typography>
        <Typography variant="body1" color="initial">LU-VI de 09:00 a 19:00</Typography>
        <Typography variant="body1" color="initial">SA de 09:00 a 13:00</Typography>
        </Box>
        <Box component="section" className="my-5">
          <Typography variant="body1" color="initial">Cobranza de créditos:</Typography>
          <Typography variant="body1" color="initial" className="font-bold">cobranzas@citytour.com.ar</Typography>
        </Box>
        <Box className="my:5">
          <Typography variant="body1" color="initial">Venta telefónica:</Typography>
          <Typography component="pre" className="font-bold">0810 333 8700</Typography>
          <Typography variant="body1" color="initial">LU-VI de 08:00 a 20:00 hs</Typography>
          <Typography variant="body1" color="initial">SA-DO de 09:00 a 21:00 hs</Typography>
        </Box>
        </Box>
        </Container>
    </>
  )
}

export default Footer;