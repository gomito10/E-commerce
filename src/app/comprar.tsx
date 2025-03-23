"use client"
import {Button} from '@mui/material';
import {useRouter} from 'next/navigation';
function Compra(){
  const router=useRouter();
  function handleClick(){
    router.push("http://localhost:4000/compras")
  }
  return(
     <>
       <Button variant="contained" color="error" fullWidth onClick={handleClick}>Comorar</Button>
     </>
    )
}
export default Compra;