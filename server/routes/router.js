const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs");
const nodemailer=require("nodemailer")
const{body,validationResult}=require("express-validator");
const crypto=require("crypto");
const jwt=require("jsonwebtoken");
const User=require("../model/schema.js")
router.post("/register",[
  body("usuario")
  .trim()
  .notEmpty().withMessage("Completar este campo")
  .isLength({min:8,max:20}).withMessage("Formato no valido")
  .matches(/^[a-zA-Z0-9]+$/).withMessage("El usuario debe tener solo letras y numeros"),
  body("password")
  .trim()
  .notEmpty().withMessage("Completar este campo")
  .isLength({min:8,max:20}).withMessage("Formato no valido")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%+?&])[A-Za-z\d@$!%+?&]{0,}$/).withMessage("La contraseña debe tener al menos 1 mayuscula,una minuscula,un numero y un caracter especial"),
    body("confirmPassword")
    .trim()
    .notEmpty().withMessage("Completar este campo")
    .custom((value,{req})=>{
      if(value !== req.body.password){
        throw new Error("Las contraseñas no coinciden")
      }
      return true
    }),
    body("dni")
    .trim()
    .notEmpty().withMessage("Completar este campo")
    .isNumeric().withMessage("Debe contener valores numéricos"),
    body("email")
    .trim()
    .notEmpty().withMessage("Completar este campo")
    .isEmail().withMessage("Formato no valido"),
    body("telefono")
    .trim()
    .matches(/^[0-9+\-\s]+$/).withMessage("El telefono debe contener solo numeros,espacios,guiones y el simbolo '+'"),
    body("nombre")
    .trim()
    .notEmpty().withMessage("Completar este campo"),
    body("apellido")
    .trim()
    .notEmpty().withMessage("Completar este campo")
  ],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }
    try{
      const {usuario,password,dni,email,telefono,nombre,apellido}=req.body;
      const existingUser=await User.findOne({usuario});
      const existingDni=await User.findOne({dni});
      const existingEmail=await User.findOne({email});
      const existingTelefono=await User.findOne({telefono});
      if(existingTelefono || existingEmail || existingUser || existingDni){
        return res.status(409).json({error:"El usuario ya existe"})
      }
      const newUser=new User({
        usuario,
        password,
        nombre,
        apellido,
        email,
        telefono,
        dni,
      });
      await newUser.save();
      return res.status(200).json({message:"registro exitoso"})
    }catch(error){
      if(error.name==="validationError"){
        return res.status(400).json({error:error.message})
      }
    }
    return res.status(500).json({error:"Error en el servidor durante el registro de un nuevo usuario"})
  })
  router.post("/login",[
      body("usuario")
      .trim()
      .notEmpty().withMessage("Completar este campo"),
      body("password")
      .trim()
      .notEmpty().withMessage("Completar este campo")
    ],async (req,res)=>{
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
      }
      try{
        const{usuario,password}=req.body;
        const username=await User.findOne({usuario});
        if(!username){
          return res.status(400).json({error:"USER_NOT_FOUND",message:"contraseña o password incorrecto",user:usuario})
        }
        const miPassword=await bcrypt.compare(password,username.password);
        if(!miPassword){
<<<<<<< HEAD
          return res.status(400).json({error:"INVALID_PASSWORD",message:"contraseña o usuario incorrecto"})
=======
          return res.status(400).json({error:"INVALID_PASSWORD",message:"contraseña o usuario incorrecto",miError:password})
>>>>>>> 3dde271f8c48691be7ac3abdf38a9a2c887aa755
        }
        const token=jwt.sign({usuario:username.usuario},"secreto",{expiresIn:"40s"});
        const refreshToken=jwt.sign({usuario:username.usuario},"refresco",{expiresIn:"7d"});
        username.refreshToken=refreshToken;
        await username.save();
{/*res.cookie("token",token,{
          httpOnly:true,
          secure:false,
          sameSite:"strict",
          maxAge:15*60*1000
        })
        res.cookie("refreshToken",refreshToken,{
          httpOnly:true,
          secure:false,
          sameSite:"strict",
          maxAge:7*24*60*60*1000
        })*/}
        return res.status(200).json({message:"Login exitoso",token,refreshToken,message:username.usuario})
      }catch(error){
        res.status(500).json({error:error.message,message:"Error en el servidor"})
      }
    }
    )
    const autenticationToken=(req,res,next)=>{
<<<<<<< HEAD
      const autHeader=req.headers["authorization"];
      const token=autHeader && autHeader.split(" ")[1];
      //const accessToken=req.cookies.token;
      if(!token){
        return res.status(400).json({message:"El token no existe"})
=======
      //const autHeader=req.headers["authorization"];
      //const token=autHeader && autHeader.split(" ")[1];
      const accessToken=req.cookies.token;
      if(!accessToken){
        return res.status(400).json({error:"NO_TOKEN",message:"El token no existe"})
>>>>>>> 3dde271f8c48691be7ac3abdf38a9a2c887aa755
      }
      jwt.verify(token,"secreto",(err,user)=>{
        if(err){
<<<<<<< HEAD
          if(err.name==="TokenExpiredError"){
          return res.status(403).json({error:"Token expirado"})
        }else{
          return res.status(403).json({error:"Token invalido"})
=======
          return res.status(403).json({error:"INVALID_TOKEN",message:"Token invalido"})
>>>>>>> 3dde271f8c48691be7ac3abdf38a9a2c887aa755
        }
        req.user=user;
        next()
      }})
    }
    router.post("/refreshToken",(req,res)=>{
      const autHeader=req.headers["authorization"];
      const refreshToken=autHeader && autHeader.split(" ")[1]
      if(!refreshToken){
        return res.status(400).json({message:"Bo autenticado"})
      }
      try{
        jwt.verify(refreshToken,"refresco",(err,user)=>{
          if(err){
            return res.status(400).json({error:"Token invslido"})
          }
          const newAccessToken=jwt.sign({username:user.usuario},"secreto",{expiresIn:"15m"})
          res.status(200).json({accessToken:newAccessToken,message:"token renovado exitosamente"})
        })
        
        
      }catch(error){
        res.status(403).json({
          error:"Token invalido o expirado"
        })
      }
    })
    router.post("/reset",[
        body("email")
        .trim()
        .notEmpty().withMessage("Completar este campo")
        .isEmail().withMessage("Formato no válido")
      ],async (req,res)=>{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()})
        }
        try{
           const {email}=req.body;
          const emailExisting= await User.findOne({email});
          if(!emailExisting){
            return res.status(400).json({error:"USER_NOT_FOUND",message:"El correo no se encuentra registrado"})
          }
          const resetToken=crypto.randomBytes(32).toString("hex");
          const hashedToken=crypto.createHash("sha256").update(resetToken).digest("hex");
          emailExisting.resetToken=hashedToken;
          emailExisting.resetTokenExpiration=Date.now() + 3600000;
          await emailExisting.save();
          const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
              user:'gomito724@gmail.com',
              pass:'rkcfiqrssmdzxwoy'
            },
            secure:true
          });
          const mailOptions={
            from:'gomito724@gmail.com',
            to:email,
            subject:'Recuperación de contraseña',
            text:`Para restablecer tu contraseña,haga click en el siguiente enlace: http://localhost:4000/reset/${resetToken}`
          };
          await transporter.sendMail(mailOptions);
          res.status(200).json({message:"Hemos enviado un correo con los pasos para restablecer su contraseña"})
        }catch(error){
          res.status(500).json({error:"Error en el servidor",message:error.message})
        }
      })
      router.get("/reset/:token",async(req,res)=>{
        const {token}=req.params;
        try{
          const hashedToken=crypto.createHash("sha256").update(token).digest("hex");
          const user=await User.findOne({
            resetToken:hashedToken,
            resetTokenExpiration:{$gt:Date.now()}
          });
          if(!user){
            return res.status(400).json({error:"token invalido o expirado"})
          }
          res.status(200).json({message:"Token valido,proceder a restablecer la contraseña"});
        }catch(error){
          res.status(500).json({error:"Error aal procesar la solicitud",message:error.message})
        }
      })
      router.post("/reset/:token",async(req,res)=>{
        const {token}=req.params;
        const {newPassword}=req.body;
        try{
          const hashedToken=crypto.createHash("sha256").update(token).digest("hex");
          const user=await User.findOne({
            resetToken:hashedToken,
            resetTokenExpiration:{$gt:Date.now()}
          });
          if(!user){
            return res.status(400).json({error:"Token invalido o expirado"})
          }
          const salt=await bcrypt.genSalt(10);
          const hashPassword=await bcrypt.hash(newPassword,salt);
          user.password=hashPassword;
          user.resetToken=undefined;
          user.resetTokenExpiration=undefined;
          await user.save();
          return res.status(200).json({message:"contraseña actualizada exitosamente"});
        }catch(error){
          res.status(500).json({error:"Error al actualizar la contraseña",message:error.message})
        }
      })
      router.get("/datos",autenticationToken,async(req,res)=>{
        const user=await User.findOne({
          usuario:"RiverPlate"
        });


        if(!user){
          return res.status(400).json({error:"El usuario no existe"})
        };
        res.status(200).json({usuario:user.usuario,resetToken:user.resetToken,resetTokenExpiration:user.resetTokenExpiration,
          nombre:user.nombre,apellido:user.apellido,telefono:user.telefono,documento:user.dni,email:user.email
        })
      })
    router.get("/compras",autenticationToken,(req,res)=>{
      res.json({message:"compra exitosa"})
    })

module.exports=router;