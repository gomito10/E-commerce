const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs");
const nodemailer=require("nodemailer")
const{body,validationResult}=require("express-validator");
const redis=require("redis")
const crypto=require("crypto");
const jwt=require("jsonwebtoken");
const User=require("../model/schema.js")

const client=redis.createClient({
  url:"redis://localhost:6379"
});
client.on("connect",()=>console.log("Conexión exitosa al servidor redis"));
client.on("error",(error)=>console.log("Error al conctarse a redis"));
 client.connect().catch(console.error)
const registerSession=async (usuarioId,sessionId,res)=>{
  try{
    await client.sAdd(`sessions:${usuarioId}`,sessionId);
   return {success:true,message:"Sesión registrada correctamente"};
  }catch(error){
    throw new Error("Error en el servidor al iniciar sesión")
  }
}
const countUserSessions=async(usuarioId)=>{
  try{
    const sessionCount=await client.sCard(`sessions:${usuarioId}`);
    return sessionCount;
  }catch(error){
    throw new Error("Eror al contar sesiones")
  }
}
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
    .notEmpty().withMessage("Completar este campo")
    .isLength({min:1,max:10}).withMessage("Formato no valido"),
    body("apellido")
    .trim()
    .notEmpty().withMessage("Completar este campo")
    .isLength({min:2,max:10}).withMessage("Formato no valido")
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
          return res.status(400).json({error:"INVALID_PASSWORD",message:"contraseña o usuario incorrecto"})
        }
        const usuarioId=username._id;
        if(!usuarioId){
          return res.status(400).json({message:"El usuario por Id no existe"})
        }
        const sessionId=crypto.randomUUID();
        const result=await registerSession(usuarioId,sessionId);
        const token=jwt.sign({usuario:username.usuario,nombre:username.nombre,apellido:username.apellido,email:username.email,tel:username.telefono,documento:username.dni,id:username._id,sessionId:sessionId},"secreto",{expiresIn:"15m"});
        const refreshToken=jwt.sign({usuario:username.usuario},"refresco",{expiresIn:"7d"});
        username.refreshToken=refreshToken;
        await username.save();
        return res.status(200).json({sesion:"sesión iniciada exitosamente",message:"Login exitoso",token,refreshToken,message:username.usuario,id:username._id,sessionId
        })
      }catch(error){
        res.status(500).json({error:error.message,message:"Error en el servidor"})
      }
    }
    )
    const autenticationToken=(req,res,next)=>{
      const autHeader=req.headers["authorization"];
      const token=autHeader && autHeader.split(" ")[1];
      if(!token){
        return res.status(400).json({error:"INVALID_TOKEN",message:"El token no existe"})
      }
      jwt.verify(token,"secreto",(err,user)=>{
        if(err){
          if(err.name==="TokenExpiredError"){
            return res.status(401).json({error:"Token expirado"})
        }else{
          return res.status(403).json({error:"Token invalido"})
        }
        
      }
        req.user=user;
        next();
      })
      
    }
    router.get("/sessions",autenticationToken,async(req,res)=>{
      const user=await User.findById(req.user.id)
      if(!user){
        return res.status(400).json({message:"El usuario no existe"})
      }
      const usuarioId=req.user.id
      const sessionCount=await countUserSessions(usuarioId);
      res.status(200).json({usuarioId,sesionesActivas:sessionCount})
      
    })
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
      router.post("/recoveryUser",async(req,res)=>{
        const {email}=req.body;
        const username=await User.findOne({email});
        if(!username){
          res.status(400).json({message:"El usuario no existe"})
        };
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
            subject:'Recuperación de usuario',
            text:`Su usuario es :${username.usuario}`
          };
          await transporter.sendMail(mailOptions);
          res.json({message:"Mail enviado con exito"})
      })
      router.get("/datos",autenticationToken,(req,res)=>{
        const autHeader=req.headers["authorization"];
        const token=autHeader && autHeader.split(" ")[1]
        if(!token){
          return res.status(400).json({message:"El toke no existe"})
        }
        jwt.verify(token,"secreto",(err,user)=>{
          if(err){
           return res.status(400).json({error:"El token es invalido"})
          }
          req.user=user;
        })
        res.json({message:"Datos correctos",usuario:token,username:req.user.nombre,apellido:req.user.apellido,email:req.user.email,tel:req.user.tel,documento:req.user.documento,id:req.user.id})
      })
    router.get("/compras",autenticationToken,(req,res)=>{
      res.json({message:"compra exitosa"})
    })
   router.patch("/datos",autenticationToken,[
     body("nombre")
     .trim()
     .notEmpty().withMessage("Completar este campo")
     .isLength({min:2,max:10}).withMessage("Formato no valido")
     .isAlpha().withMessage("Debe contener solo caracteres alfabeticos"),
     body("apellido")
     .trim()
     .notEmpty().withMessage("Completar este campo")
     .isLength({min:2,max:10}).withMessage("Formato no valido")
     .isAlpha().withMessage("Debe contener solo caracteres alfabeticos"),
     body("email")
     .trim()
     .notEmpty().withMessage("Completar este campo")
     .isEmail().withMessage("Formato no valido"),
     body("telefono")
     .trim(),
     //.notEmpty().withMessage("Completar este campo")
     //.matches(/^[0-9+]+$/).withMessage("El telefono debe contener solo numeros,espacios,guiones y el simbolo '+'"),
     body("dni")
     .trim()
     .notEmpty().withMessage("Completar este campo")
     .isNumeric().withMessage("Debe contener sólo valores numéricos"),
     ],async(req,res)=>{
       const errors=validationResult(req)
       if(!errors.isEmpty()){
         return res.status(400).json({errors:errors.array()})
       }
     try{
     const {nombre,apellido,email,telefono,dni}=req.body;
     const username=await User.findById(req.user.id);
     if(!username){
       return res.status(400).json({message:"El usuario no existe"})
     }
     const objeto={}
      for (let key in req.body){
        if(req.body[key]===""){
          continue;
        }else{
          objeto[key]=req.body[key]
        }
      }
       const user=await User.findByIdAndUpdate(
           req.user.id,
           {$set:objeto},
           {new:true}
         );
         if(!user){
           res.status(400).json({error:"El usuario no existe"})
         }
         
      res.json({message:"El usuario ha sido actualizado correctamente",user:user})
         
  }catch(error){
       if(error.code===11000){
         return res.status(500).json({error:"El ususrio ya existe",message:error.message})
       }
       res.status(400).json({error:"Error en el servidor al actualizar datos en mi ruta /patch",message:error.message
     })
   }
   })
   router.patch("/direccion",[
     body("cp")
     .trim(),
     body("calle")
     .trim(),
     body("numero")
     .trim(),
     body("informacion")
     .trim()
     ],autenticationToken,async (req,res)=>{
     const errors=validationResult(req);
     if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
     };
     try{
       const{calle,numero,cp,informacion,ciudad,provincia}=req.body
       const objeto={}
      for (let key in req.body){
        if(req.body[key]===""){
          continue;
        }else{
          objeto[key]=req.body[key]
        }
      }
       const username=await User.findByIdAndUpdate(
           req.user.id,
           {$set:objeto},
           {new:true}
         );
         if(!username){
            return res.status(400).json({message:"El usuario no existe"})
         };
      res.status(200).json({respuesta:"Datos agregados exitasamente",message:username})
     }catch(error){
       res.status(500).json({eror:"Error En el servidor en agregar dirección"})
     }
     
   })
   router.get("/array",autenticationToken,async (req,res)=>{
     const user=await User.findById(req.user.id)
     if(!user){
       return res.status(400).json({message:"El usuario no existe"})
     }
     res.json({user})
   })
   router.patch("/delete",autenticationToken,async (req,res)=>{
     try{
       const{calle,numero,cp,informacion}=req.body;
       const datos=req.body;
       const user=await User.findByIdAndUpdate(req.user.id,{$unset:{calle:"",numero:"",cp:"",informacion:""}},{new:true});
       if(!user){
         return res.status(400).json({message:"El usuario no existe"})
       }
       res.json({message:user})
     }catch(error){
       res.status(500).json({error:"Error en el servidor al eliminar datos"})
     }
     
   })
   router.patch("/change-password",autenticationToken,[
     body("currentPassword")
     .trim()
     .notEmpty().withMessage("Completar este campo")
     ],async(req,res)=>{
       const errors=await validationResult(req);
       if(!errors.isEmpty()){
         return res.status(400).json({errors:errors.array()})
       }
       try{
         const{currentPassword,newPassword}=req.body;
         const username=await User.findById(req.user.id);
         if(!username){
           res.status(400).json({message:"El usuario no existe"});
         }
         const isValidPassword=await bcrypt.compare(currentPassword,username.password);
         if(isValidPassword){
           res.json({message:"La contraseña no puede ser la misma q la actual"})
         }
         const hashNewPassword=await bcrypt.hash(newPassword,10);
         await User.findByIdAndUpdate(req.user.id,{password:hashNewPassword});
         res.json({message:"La contraseña ha sido modificada correctamente"})
       }catch(error){
         res.status(500).json({error:"Error al intentar modificar la contraseña"});
       }
     });
     router.patch("/change-username",[
       body("newUsername")
       .trim()
       .notEmpty().withMessage("Completar este campo")
       .matches(/^[a-zA-Z0-9]+$/).withMessage("El usuario debe tener solo letras y numeros")
       .isLength({min:8,max:20}).withMessage("El usuario debe tener entre 8 y 20 caracteres")
       ],autenticationToken,async(req,res)=>{
         const errors=validationResult(req);
         if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()})
         }
         try{
           const{newUsername}=req.body;
           const user=await User.findById(req.user.id)
           if(!user){
             return res.status(400).json({message:"El usuario no existe"})
           };
           if(newUsername===user.usuario){
             return res.status(400).json({
               message:"El nuevo usuario debe ser diferente al actúal"
             })
           }
           const existUser=await User.findOne({usuario:newUsername});
           if(existUser){
             return res.status(400).json({message:"El usuario ya existe",user:newUsername})
           }
           
           const changeUser=await User.findByIdAndUpdate(req.user.id,{
             usuario:newUsername
           },{new:true});
           return res.json({message:"Nombre de usuario modificado correctamente",user:changeUser})
         }catch(error){
           res.status(500).json({error:"Error en el servidor al modificar el usuario",message:error.message})
         }
       })
   router.post("/logout",autenticationToken,async (req,res)=>{
     try{
     const username= await User.findById(req.user.id)
     if(!username){
       return res.status(400).json({message:"El usuario no existe"})
     }
     const autHeaders=req.headers["authorization"];
     const token=autHeaders && autHeaders.split(" ")[1];
     if(!token || typeof token !== "string"){
      return res.status(400).json({message:"El token no existe"})
     }
     const decoded=jwt.verify(token,'secreto')
     const tiempoRestante=decoded.exp-Math.floor(Date.now()/1000)
     const usuarioId=req.user.id;
     const sessionId=req.user.sessionId;
     await client.set(`blackList:${token}`,"",{EX:tiempoRestante});
     {/*await client.sRem(`sessions:${usuarioId}`,sessionId);*/}
     res.status(200).json({message:"sesión cerrada correctamente",usuario:username.usuario})
   }catch(error){
     res.status(500).json({error:"Error al intentar cerrar sesión",message:error.message})
   }
   })
module.exports=router;