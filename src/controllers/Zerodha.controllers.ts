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


function getAllData(date: any) {
    date.setDate(date.getDate() - 1);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const ZerodhahistoryData = async (req: Request, res: Response) => {
    let ZERODHA_ACCESS_TOKEN = await getCredentials()
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

        let response: any = await axios.get(`https://api.kite.trade/instruments/historical/${instrument_token}/${intervalTime}`, {
            params: {
                from: newData,
                to: to,
            },
            headers: {
                'X-Kite-Version': `3`,
                'Authorization': `token ${process.env.ZERODHA_API_KEY}:${ZERODHA_ACCESS_TOKEN ||"QTXrWAAsQARTBiWot7N6wloq7M1aOhwk"}`,
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


