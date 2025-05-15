import express from "express";
import { Login, Signup, Updatepassword } from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const authrouter=express.Router();

authrouter.post("/login",Login)
authrouter.post("/signup",Signup)
authrouter.put("/update-password",protect,Updatepassword)




export default authrouter;