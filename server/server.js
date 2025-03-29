const express=require("express");
require("./dataBase/connectDb.js");
const cookieParser=require("cookie-parser")
const authRouter=require("./routes/router.js")
const cors=require("cors")
const redis=require("redis")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use("/",authRouter)


app.listen(4000,()=>console.log("coneccion establecida en el puerto 4000"))