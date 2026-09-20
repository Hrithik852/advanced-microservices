import mongoose from "mongoose";

export const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('auth service connected to db');
        
    }
    catch(err){
        console.error('MongoDb connection error',err);
        process.exit(0);
    }
}