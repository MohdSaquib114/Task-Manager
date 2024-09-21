import express from "express"
import cors from "cors"
import connectDB from "./config/db"
import rootRoute from "./route/route"
import cookieParser from 'cookie-parser';
require("dotenv").config()

connectDB()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors({
  
    origin: 'https://task-manager-8uxk.vercel.app',
    credentials: true, } 
))
app.use(cookieParser())

app.use("/api/",rootRoute)

app.listen(PORT,()=>console.log("Server is listeing on",PORT))