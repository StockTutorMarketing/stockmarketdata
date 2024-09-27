import axios from "axios";
import { Request, Response } from "express";
import { getCredentials } from "../services/getCredentials";


const unixToFormattedDate = (ts:any) => {
    const date = new Date(ts * 1000);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata',
    };

    // Get the formatted components
    const year = date.toLocaleString('en-IN', { year: 'numeric', timeZone: 'Asia/Kolkata' });
    const month = date.toLocaleString('en-IN', { month: '2-digit', timeZone: 'Asia/Kolkata' });
    const day = date.toLocaleString('en-IN', { day: '2-digit', timeZone: 'Asia/Kolkata' });
    const hour = date.toLocaleString('en-IN', { hour: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });
    const minute = date.toLocaleString('en-IN', { minute: '2-digit', timeZone: 'Asia/Kolkata' });
    const second = date.toLocaleString('en-IN', { second: '2-digit', timeZone: 'Asia/Kolkata' });

    // Format the final output
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};



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

        console.log(to,from ,"This is to from")

        from = await convertUnixTimestampToZerodhaFormat(from);
        to = await convertUnixTimestampToZerodhaFormat(to+80000)

        let newData;
        if (interval === 'minute' || interval === '3minute' || interval === '5minute' || interval === "10minute") {
            newData = new Date(new Date(from).setDate(new Date(from).getDate() - 10)).toISOString().replace('T', ' ').substring(0, 19);
        } else if (interval === 'week' || interval === 'month') {
            newData = new Date(new Date(from).setDate(new Date(from).getDate() - 1)).toISOString().replace('T', ' ').substring(0, 19);

        } else {
            newData = new Date(new Date(from).setDate(new Date(from).getDate() - 10)).toISOString().replace('T', ' ').substring(0, 19);
        }

        let intervalTime;

        if (interval === 'week' || interval === 'month') {
            intervalTime = 'day'
        } else {
            intervalTime = interval
        }

        let ZERODHA_API_KEY='zm8b8kat9ok624cd'
        let ZERODHA_ACCESS_TOKEN='7NrrFxbssoZ96CdBsN93r6WzKFjdaeMD'


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

        console.log(response.data ,"this is my data")

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


