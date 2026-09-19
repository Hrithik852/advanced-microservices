import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { rabbitChannel } from '../config/rabbitMQ.js'
import { userModel } from '../models/user.js'

export const RegisterController=async(req,res)=>{
    try{
    const {email,password}=req.body;
  const  isUserExist=await userModel.findOne({email});
    if(isUserExist) return res.status(400).json({error:"email in use"})
        const hashedPass=await bcrypt.hash(password,10)
    const user=await userModel.create({
email,password:hashedPass})
if(rabbitChannel){
    const eventPayload=JSON.stringify({
        userId:user._id,
        email:user.email,
        action:'user_registered'
    })
    rabbitChannel.publish('user_events','',Buffer.from(eventPayload))
    console.log(`[x] Published user.created event for ${email}`);

}else{
    console.error('RabbitMq channel not available');
    
}

const token=jwt.sign({user:user._id},process.env.JWT_SECRET,{expiresIn:'1D'})
res.cookie('token',token,{
    httpOnly:true,
    sameSite:'strict',
    maxAge:24*60*60*1000
})    
return res.status(201).json({
    message: "User registered successfully", 
      userId: user._id
})
}

catch(err){
    console.error('Registration error:', err);
    res.status(500).json({ error: "Registration failed" });
}

}

export const LoginController=async(req,res)=>{

}