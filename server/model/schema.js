const mongoose =require("mongoose")
const bcrypt=require("bcryptjs")
const userSchema=new mongoose.Schema({
  nombre:{
    type:String,
    trim:true,
  },
  apellido:{
    type:String,
    trim:true
  },
  email:{
    type:String,
    match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    trim:true,
    uniqie:true
  },
  dni:{
    type:Number,
    trim:true,
    unique:true
  },
  telefono:{
    type:String,
    match:/^(?:\+?(\d{1,3}))?[-. (]*(\d{1,4})[-. )]*(\d{1,4})[-. ]*(\d{1,9})(?: *x(\d+))?$/,
    trim:true,
  },
    usuario:{
      type:String,
      required:true,
      unique:true,
      trim:true
    },
    password:{
      type:String,
      required:true,
      trim:true,
    },
    refreshToken:String,
    resetToken:String,
    resetTokenExpiration:Date,
    cp:{
      type:String,
      trim:true
    },
    calle:{
      type:String,
      trim:true,
    },
    numero:{
      type:String,
      trim:true,
    },
  informacion:{
    type:String,
    trim:true
  },
  provincia:{
    type:String
  },
  ciudad:String
})

userSchema.pre("save",async function(next){
  try{
    const user=this;
    if(user.isModified("password")){
      const salt=await bcrypt.genSalt(10);
      user.password=await bcrypt.hash(user.password,salt)
    }
    next()
  }catch(error){
    next(error)
  }
})
const Usuario=mongoose.model("Usuario",userSchema)
module.exports=Usuario