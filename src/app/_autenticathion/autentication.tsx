
const getProtecredData=async ()=>{
        try{
    const response=await fetch("http://localhost:4000/compras",{
      method:"GET",
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    if(response.status===403){
      location.href="/login"
      return
    }
    if(response.status===401){
      const refreshResponse=await fetch("http://localhost:4000/refreshToken",{
        method:"POST",
        headers:{
          Authorization:`Bearer ${refreshToken}`
        },
      });
      if(refreshResponse.ok){
        const result=await refreshResponse.json();
        //setToken(result.accessToken);
        //setRefreshToken(result.refreshToken)
        const retryResponse=await fetch("http://localhost:4000/compras",{
          method:"GET",
          headers:{
            Authorization:`Bearer ${result.accessToken}`
          }
        });
        if(retryResponse.ok){
          const data=await retryResponse.json();
          console.log("Datos protegidos despues de renovar el Token",data);
          location.href="/compras";
          return
        }else{
          console.log("No se puede acceder despues denovar el token")
        location.href="/login";
        return
      }
      }else{
        console.log("Error al refrescar token");
        location.href="/login"
      }
    }
    const data=await response.json();
    console.log("Datos protegidos",data);
    location.href="/compras"
  }catch(error){
    console.error("Error en la solicitud a la ruta protegida",error.message)
  }
    
  }
  export default getProtecredData;