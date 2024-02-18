import express from 'express'
import { config } from 'dotenv';
import {ErrorMiddleware} from './middlewares/Error.js'
import cookieParser from "cookie-parser"
import cors from "cors";

import courseRoute from './routes/courseRoutes.js'
import userRoute from './routes/userRoute.js'
import paymentRoute from "./routes/paymentRoutes.js"

config({
    path:"./config/config.env"
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
app.use(cookieParser())
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET", "POST", "PUT", "DELETE"]
}))

app.use("/api/v1", courseRoute)
app.use("/api/v1", userRoute)
app.use("/api/v1",paymentRoute)

export default app;

app.use(ErrorMiddleware)