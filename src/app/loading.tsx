import {Backdrop,CircularProgress} from '@mui/material'

export default function Loading(){
  return(
    <>
      <Backdrop open={true}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </>
  )
}