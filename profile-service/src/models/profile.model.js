import mongoose from "mongoose";

const profileSchema=new mongoose.Schema({
    authUserId:{type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
    },
    firstName:{type:String,default:''},
    lastName:{type:String,default:''},
    bio:{type:String,default:''}
},{timestamps:true})

export const profileModel= mongoose.model('profile',profileSchema);