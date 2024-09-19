import { Router } from "express";
import userRouter from "./user/route"
import taskRouter from "./task/route"

const route = Router()

route.use("/user",userRouter)
route.use("/task",taskRouter)

export default route