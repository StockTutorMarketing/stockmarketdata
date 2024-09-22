import express from 'express';
import { ZerodhahistoryData } from '../controllers/Zerodha.controllers';
const router = express.Router();

router.route("/historical-data").post(ZerodhahistoryData)

export default router