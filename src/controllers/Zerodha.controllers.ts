import axios from "axios";
import { Request, Response } from "express";
import { getCredentials } from "../services/getCredentials";



//unix to normal form 
function convertUnixTimestampToZerodhaFormat(unixTimestamp: any) {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');


    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const ZerodhahistoryData = async (req: Request, res: Response) => {
    try {
        let { instrument_token, from, to, interval } = req.body;



        if (!instrument_token || !from || !to || !interval) {
            return res.json({
                status: false,
                message: "Missing required parameters: instrument_token, from, to, interval",
            });
        }

        from = await convertUnixTimestampToZerodhaFormat(from);
        to = await convertUnixTimestampToZerodhaFormat(to)

        let newData;
        if (interval === 'minute' || interval === '3minute' || interval === '5minute' || interval === "10minute") {
            newData = new Date(new Date(from).setDate(new Date(from).getDate() - 10)).toISOString().replace('T', ' ').substring(0, 19);
        } else if (interval === 'week' || interval === 'month') {
            newData = new Date(new Date(from).setDate(new Date(from).getDate() - 1)).toISOString().replace('T', ' ').substring(0, 19);

        } else {
            newData = new Date(new Date(from).setDate(new Date(from).getDate() - 100)).toISOString().replace('T', ' ').substring(0, 19);
        }

        let intervalTime;

        if (interval === 'week' || interval === 'month') {
            intervalTime = 'day'
        } else {
            intervalTime = interval
        }

        let ZERODHA_API_KEY='zm8b8kat9ok624cd'
        let ZERODHA_ACCESS_TOKEN='JTJQWUfWuYIqtTko17cJjTUVnSBqtVWt'

        let response: any = await axios.get(`https://api.kite.trade/instruments/historical/${instrument_token}/${intervalTime}`, {
            params: {
                from: newData,
                to: to,
            },
            headers: {
                'X-Kite-Version': `3`,
                'Authorization': `token ${ZERODHA_API_KEY}:${ZERODHA_ACCESS_TOKEN ||""}`,
            },
        });


        const convertedCandles = response.data.data.candles.map((candle: any) => [
            new Date(candle[0]).getTime(),
            candle[1],
            candle[2],
            candle[3],
            candle[4],
            candle[5]
        ]);

        res.json({
            status: true,
            candles: convertedCandles,
        });

    } catch (error: any) {
        return res.json({
            status: false,
            message: `Failed to fetch historical data: ${error.response ? error.response.data.message : error.message}`,
        });
    }
};


