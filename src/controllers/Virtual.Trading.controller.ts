import { NextFunction, Request, Response } from "express";
// @ts-ignore
import _ from 'lodash';
// @ts-ignore
import getAllSymbols from "../../data/stocks";


const DEFAULT_STOCK_COUNT = 100;



//This is the function that will use to send stock symbol data 
export const searchSymbols = async (req: Request, res: Response) => {
    const { symbol = '', exchange = '' } = req.query;
    const allSymbols = getAllSymbols;
    //@ts-ignore
    if (symbol.length < 3 && exchange === '') {
        const defaultSymbols = allSymbols.slice(0, DEFAULT_STOCK_COUNT);
        return res.json(defaultSymbols);
    }
    const filteredSymbols = allSymbols.filter((stock: any) => {
        const symbolMatches = stock.symbol.toLowerCase().includes((symbol as string).toLowerCase());
        const descriptionMatches = stock.description?.toLowerCase().includes((symbol as string).toLowerCase()) ?? false;
        const exchangeMatches = exchange ? stock.exchange.toLowerCase() === (exchange as string).toLowerCase() : true;
        return (symbolMatches || descriptionMatches) && exchangeMatches;
    });
    const result = filteredSymbols.slice(0, DEFAULT_STOCK_COUNT);
    res.json(result);
};

export const virtualTradingOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { instrumentkey, marketPrice, exchange, symbole, quantity } = req.body()
    }
    catch (error) {
        next(error);
    }
}