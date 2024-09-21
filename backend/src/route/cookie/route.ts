import { Router, Request, Response } from "express";

import jwt, { JwtPayload } from 'jsonwebtoken';
require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET as string

const route = Router()



  route.get("/check-auth",async (req:Request,res:Response)=> {
    const token = req.cookies.token;

    if (!token) {
      return res.status(200).json({ cookie:false});
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
 
      return res.status(200).json({cookie:true ,user: decoded });
    } catch (err) {
      return res.status(403).json({ cookie:false });
    }
  })
  
  export default route