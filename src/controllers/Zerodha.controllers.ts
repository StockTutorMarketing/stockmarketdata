import axios from "axios";
import { Request, Response } from "express";

export const ZerodhahistoryData = async (req:Request, res:Response) => {
    try {
        const { instrument_token, from, to, interval } = req.body;

        if (!instrument_token || !from || !to || !interval) {
            return res.json({
                status: false,
                message: "Missing required parameters: instrument_token, from, to, interval",
            });
        }

        const response:any = await axios.get(`${process.env.ZERODHA_ROOT_API ||"https://api.kite.trade"}/instruments/historical/${instrument_token}/${interval}`, {
            params: {
                from: from,
                to: to,
            },
            headers: {
                'X-Kite-Version': `${process.env.ZERODHA_API_VERSION || "3"}`,
                'Authorization': `token ${process.env.ZERODHA_API_KEY || "zm8b8kat9ok624cd"}:${process.env.ZERODHA_ACCESS_TOKEN || "QTXrWAAsQARTBiWot7N6wloq7M1aOhwk"}`,
            },
        });

        function convertToTradingViewTimestamp(dateString:Date) {
            const date = new Date(dateString);

            const utcDate = new Date(Date.UTC(
                date.getUTCFullYear(), 
                date.getUTCMonth(), 
                date.getUTCDate(), 
                0, 0, 0 
            ));
            return Math.floor(utcDate.getTime() / 1000);
        }
        
        

        const convertedCandles = response.data.data.candles.map((candle:any) => [
            convertToTradingViewTimestamp(candle[0]), 
            candle[1], 
            candle[2],
            candle[3], 
            candle[4], 
            candle[5] 
        ]);

        res.json({
            status: true,
            candles: response.data.data.candles,
        });

    } catch (error:any) {
        return res.json({
            status: false,
            message: `Failed to fetch historical data: ${error.response ? error.response.data.message : error.message}`,
        });
    }
};
