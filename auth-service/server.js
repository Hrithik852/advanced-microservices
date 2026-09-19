import { configDotenv } from "dotenv";
import express from "express";
import { connectDb } from "./src/config/db.js";
import  app  from "./src/app.js";
import { connectRabbitMQ } from "./src/config/rabbitMQ.js";
const PORT=5001;
connectDb();
connectRabbitMQ()
app.listen(PORT,()=>{
    console.log(`Auth Service listening on port ${PORT}`);
})