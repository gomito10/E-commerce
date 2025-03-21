const mongoose=require('mongoose');
const url="mongodb+srv://programadorweb898:Gomito1980@cluster0.cckqn.mongodb.net/comerciocity?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(url)
.then(()=>console.log("conección a la base de datos exitosa"))
.catch(error=>console.error("error en la coneccion",error.message))