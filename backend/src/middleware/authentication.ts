
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET as string

type User = {
    id: string;
    username: string;
    name: string;

  };
declare module 'express-serve-static-core' {
    interface Request {
      user?: User;
    }
  }

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    
console.log("token",token)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  //  @ts-ignore
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
    

    req.user = {
        id: decoded.id,
        username: decoded.username,
        name: decoded.name
    
    }; 
    next();
  });
};
