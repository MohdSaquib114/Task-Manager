import express from "express"
import cors from "cors"
import connectDB from "./config/db"
require("dotenv").config()

connectDB()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

app.listen(PORT,()=>console.log("Server is listeing on",PORT))