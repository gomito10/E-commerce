'use client';

import {useRouter} from 'next/navigation';
import {Button} from '@mui/material';
export default function Password(){
  const router=useRouter();
function handleClick(){
  router.push("/blog");
}
  return(
  <>
    <h1 id="password">Password</h1>
    <button onClick={handleClick}>click</button>
    <Button variant="outlined" color="success">click</Button>
  </>
  )
}