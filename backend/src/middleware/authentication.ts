
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET as string

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token; // Assuming you're using cookie-parser

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  //  @ts-ignore
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
    
    //  @ts-ignore
    req.user = decoded; 
    next();
  });
};
