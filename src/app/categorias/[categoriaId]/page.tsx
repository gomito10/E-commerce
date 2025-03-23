import Productos from '../../productos/page'

export default function CategoriaId({params}){
  return(
    
    <Productos y={`products/category/${params.categoriaId}`}/>
  )
}