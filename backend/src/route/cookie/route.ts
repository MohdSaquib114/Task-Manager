import { Router, Request, Response } from "express";

import jwt, { JwtPayload } from 'jsonwebtoken';
import { authenticate } from "../../middleware/authentication";
require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET as string

const route = Router()



  route.get("/check-auth",authenticate,async (req:Request,res:Response)=> {
    const user = req.user

    if (!user) {
      return res.status(200).json({ cookie:false});
    }
  
    try {
      
 
      return res.status(200).json({cookie:true ,user: user });
    } catch (err) {
      return res.status(403).json({ cookie:false });
    }
  })
  
  export default route