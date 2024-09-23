import { zerodhaCredentials } from "../models/Credentials.modal";

export const getCredentials = async () => {
    try {

        const myCredentials = await zerodhaCredentials.find({ Apikey: process.env.ZERODHA_API_KEY })
        return myCredentials[0].accesToken;
    } catch (error: any) {
        console.log(error)
    }
}