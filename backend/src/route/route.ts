import { Router } from "express";
import userRouter from "./user/route"
import taskRouter from "./task/route"
import cookieRoute from "./cookie/route"

const route = Router()

route.use("/user",userRouter)
route.use("/task",taskRouter)
route.use("/cookie",cookieRoute)

export default route