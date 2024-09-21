import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt';
import {User}  from '../../modal/user';  
import { signupSchema } from '../../schemas/signupSchema';  
import { validate } from "../../middleware/validation";
import * as jwt from "jsonwebtoken"
import { signInSchema } from "../../schemas/signinSchema";
require("dotenv").config()

const route = Router()
const JWT_SECRET = process.env.JWT_SECRET as string

route.post("/sign-up", validate(signupSchema) ,async (req: Request, res: Response) => {
    try {
    
      const { name, username, password } = req.body;
  
     
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
  
      const newUser = new User({
        name,
        username,
        password: hashedPassword,
      });
  
     
      await newUser.save();
      const token = jwt.sign({ id: newUser._id, username,name: newUser.name }, JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, {
     
        maxAge: 3600000, 
       
        path: '/',
      });
  
  
      return res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
      console.error('Error in sign-up:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  })


route.post("/sign-in", validate(signInSchema), async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
  
     
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      
      const token = jwt.sign({ id: user._id, username,name: user.name }, JWT_SECRET, { expiresIn: '1h' });
  
   
      res.cookie('token', token, {
     
        maxAge: 3600000, 
   
        path: '/',
      });
     
  
      return res.json({ success: true, message: 'Sign in successful' });

    } catch (error) {
      console.error('Error in sign-in:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });


route.post("/logout", (req: Request, res: Response) => {
    res.clearCookie('token'); 

    return res.json({ success: true, message: 'Logged out successfully' });
  });
  
  



export default route