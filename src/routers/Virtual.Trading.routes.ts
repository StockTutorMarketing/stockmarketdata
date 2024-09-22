import express from "express"
import { searchSymbols } from "../controllers/Virtual.Trading.controller";

const router=express.Router();

router.route("/").get(searchSymbols)

export default router;