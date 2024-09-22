import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
import { ZerodhahistoryData } from './controllers/Zerodha.controllers';
import VirtualTrading from "./routers/Virtual.Trading.routes"

const app=express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.use("/api/v1",ZerodhahistoryData)
app.use("/virtual-trading",VirtualTrading)




export default app;