import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
import { ZerodhahistoryData } from './controllers/Zerodha.controllers';
import VirtualTrading from "./routers/Virtual.Trading.routes"
import mongoose from 'mongoose';
import { zerodhaCredentials } from './models/Credentials.modal';

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()


// //Database
// mongoose.connect(process.env.MONGOURI || "")
//     .then((connection) => {
//         console.log(`Database connected: ${connection.connection.host}`);
//     })
//     .catch((error) => {
//         console.error("Database connection error:", error);
// });


app.use("/api/v1", ZerodhahistoryData)
app.use("/virtual-trading", VirtualTrading)




export default app;