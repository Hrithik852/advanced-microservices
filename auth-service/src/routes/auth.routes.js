import express from 'express'
import { LoginController, logoutController, RegisterController } from "../controllers/auth.controller.js";
 const authRouter=express.Router()

 authRouter.post('/register',RegisterController)
authRouter.post('/login',LoginController)
authRouter.post('/logout',logoutController)
export default authRouter