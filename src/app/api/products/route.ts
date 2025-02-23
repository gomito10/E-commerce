import {products} from './data'

export async function GET(){
  return Response.json(products)
}
export async function POST(request){
  const productos=await request.json();
  const newProductos={
    id:products.length + 1,
    nombre:productos.nombre
  };
  products.push(newProductos);
  return new Response(JSON.stringify(newProductos),{
    headers:{
      "Content-Type":"application/json"
    },
    status:200
  })
}