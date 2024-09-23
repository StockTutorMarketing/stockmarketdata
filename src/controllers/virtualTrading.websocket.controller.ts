import { KiteTicker } from 'kiteconnect';
import { WebSocket } from 'ws';
import { VirtualTradingOrder } from '../models/VirtualTradeOrder.model';
import { v4 as uuidv4 } from 'uuid';
import { Wallet } from '../models/wallet.model.js';

const apiKey = process.env.ZERODHA_API_KEY || "zm8b8kat9ok624cd";
const accessToken =process.env.ZERODHA_ACCESS_TOKEN || 'QTXrWAAsQARTBiWot7N6wloq7M1aOhwk';

const ticker = new KiteTicker({
  api_key: apiKey,
  access_token: accessToken,
});

class WebSocketClient {
  private ws: WebSocket;
  private client: any;
  private pingTimeout?: NodeJS.Timeout;
  private subscribedTokens: Set<string> = new Set();

  constructor(ws: WebSocket, client: any) {
    this.ws = ws;
    this.client = client;
    this.pingTimeout = undefined;
    this.heartbeat();
    this.setupMessageHandling();
    this.setupKiteTicker();
  }

  // Heartbeat for connection keep-alive
 private heartbeat(): void {
    clearTimeout(this.pingTimeout);
    this.pingTimeout = setTimeout(() => {
      console.log(`Disconnecting user ${this.client} due to no ping`);
      this.ws.close(1001, 'Ping timeout - Disconnecting.');
    }, 10000);
  }

  // Setup KiteTicker for price updates
 private setupKiteTicker() {
    ticker.on('ticks', this.handleKiteData.bind(this));
    ticker.on('connect', this.subscribeToKite.bind(this));
    ticker.on('error', (error:any) => {
      console.error('KiteTicker error:', error);
    });
    ticker.on('disconnect', () => {
      console.log('KiteTicker disconnected.');
    });
    ticker.connect();
  }

private  subscribeToKite() {
    if (this.subscribedTokens.size > 0) {
      const tokensArray:any = Array.from(this.subscribedTokens);
      ticker.subscribe(tokensArray);
      ticker.setMode(ticker.modeQuote, tokensArray);
    }
  }

 private handleKiteData(ticks:any) {
    ticks.forEach((tick:any) => {
      if (this.subscribedTokens.has(tick.instrument_token)) {
        this.ws.send(JSON.stringify(tick));
      }
    });
  }


  // Subscribe to specific tokens from client
  public subscribe(tokens: any[]): void {
    tokens.forEach((token) => this.subscribedTokens.add(token));
    this.subscribeToKite();
  }

  // Unsubscribe from all tokens
  public unsubscribe(): void {
    const tokensToUnsubscribe: number[] = Array.from(this.subscribedTokens).map(Number);
    if (tokensToUnsubscribe.length > 0) {
      ticker.unsubscribe(tokensToUnsubscribe);
      console.log(`Unsubscribed from tokens: ${tokensToUnsubscribe}`);
    }
    this.subscribedTokens.clear();
  }

  // Setup WebSocket message handling
  private setupMessageHandling(): void {
    this.ws.on('message', async (data) => {
      try {
        const message = data.toString();
        const requestData = JSON.parse(message);

        switch (requestData.type) {
          case 'ping':
            this.ws.send('pong');
            this.heartbeat();
            break;
          case 'subscribe':
            this.subscribe(requestData.tokens);
            break;
          case 'unsubscribe':
            this.unsubscribe();
            break;
          case 'buyorder':
            await this.handleBuyOrder(requestData);
            break;
          case 'sellorder':
            await this.handleSellOrder(requestData);
            break;
          case 'cancelorder':
            await this.handleCancelOrder(requestData);
            break;
          default:
            console.log(`Received unknown message: ${message}`);
            this.ws.send(
              JSON.stringify({ status: 'error', message: 'Unknown message type' })
            );
        }
      } catch (error: any) {
        console.error('Error processing WebSocket message:', error);
        this.ws.send(
          JSON.stringify({
            status: 'error',
            message: 'Invalid WebSocket message format',
            details: error.message,
          })
        );
      }
    });

    this.ws.on('close', () => this.cleanup());
    this.ws.on('error', (error) => {
      console.error(`WebSocket error for client ${this.client}:`, error);
      this.cleanup();
    });
  }

  // Handle buy order
  private async handleBuyOrder(requestData: any) {
    const { userId, instrument_token, marketPrice, bought_qty, symbol } = requestData;

    if (!userId || !instrument_token || !marketPrice || !bought_qty) {
      this.ws.send(
        JSON.stringify({ status: 'error', message: 'Missing data for buy order' })
      );
      return;
    }

    const totalAmount = marketPrice * bought_qty;
    const orderId = uuidv4();

    try {
      const wallet = await Wallet.findOne({ userId });
      if (!wallet || wallet.amount < totalAmount) {
        this.ws.send(
          JSON.stringify({ status: 'error', message: 'Insufficient wallet balance' })
        );
        return;
      }

      wallet.amount -= totalAmount;
      await wallet.save();

      const order = await VirtualTradingOrder.findOneAndUpdate(
        { userId, instrument_token },
        { $inc: { bought_qty } },
        { upsert: true, new: true }
      );

      this.ws.send(
        JSON.stringify({ status: 'success', message: `Buy order placed for ${symbol}`, orderId })
      );
    } catch (error: any) {
      console.error('Error handling buy order:', error);
      this.ws.send(
        JSON.stringify({
          status: 'error',
          message: 'Error processing buy order',
          details: error.message,
        })
      );
    }
  }

  // Handle sell order
  private async handleSellOrder(requestData: any) {
    const { orderId, userId, stockSymbol, quantity, price } = requestData;

    if (!orderId || !userId || !stockSymbol || !quantity || !price) {
      this.ws.send(
        JSON.stringify({ status: 'error', message: 'Missing data for sell order' })
      );
      return;
    }

    try {
      const order = await VirtualTradingOrder.findOne({ orderId, userId });
      if (!order) {
        this.ws.send(JSON.stringify({ status: 'error', message: 'No matching order found.' }));
        return;
      }

      const totalAmount = price * quantity;
      const wallet: any = await Wallet.findOne({ userId });
      wallet.amount += totalAmount;
      await wallet.save();

      this.ws.send(
        JSON.stringify({ status: 'success', message: `Sell order placed for ${stockSymbol}` })
      );
    } catch (error: any) {
      console.error('Error handling sell order:', error);
      this.ws.send(
        JSON.stringify({
          status: 'error',
          message: 'Error processing sell order',
          details: error.message,
        })
      );
    }
  }

  // Handle cancel order
  private async handleCancelOrder(requestData: any) {
    const { orderId, userId } = requestData;

    if (!orderId || !userId) {
      this.ws.send(
        JSON.stringify({ status: 'error', message: 'Missing data for cancel order' })
      );
      return;
    }

    try {
      const order = await VirtualTradingOrder.findOneAndDelete({ orderId, userId });
      if (!order) {
        this.ws.send(JSON.stringify({ status: 'error', message: 'Order not found.' }));
        return;
      }

      const wallet: any = await Wallet.findOne({ userId });
      wallet.amount += order.totalPurchasePrice; 
      await wallet.save();

      this.ws.send(
        JSON.stringify({ status: 'success', message: `Order ${orderId} canceled successfully.` })
      );
    } catch (error: any) {
      console.error('Error canceling order:', error);
      this.ws.send(
        JSON.stringify({
          status: 'error',
          message: 'Error processing cancel order',
          details: error.message,
        })
      );
    }
  }

  private cleanup(): void {
    clearTimeout(this.pingTimeout);
    this.unsubscribe();
  }
}

export default WebSocketClient;
