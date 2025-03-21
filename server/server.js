const express=require("express");
require("./dataBase/connectDb.js")
const authRouter=require("./routes/router.js")
const cors=require("cors")
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(express.json())
app.use("/",authRouter)


app.listen(4000,()=>console.log("coneccion establecida en el puerto 4000"))