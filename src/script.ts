import { WebSocketServer, WebSocket } from "ws"
import  { IncomingMessage } from "http";
import WebSocketClient from "./controllers/virtualTrading.websocket.controller";
import app from "./app";




const servers=app.listen(8000, () => {
    console.log(`server is running : 8000`)
})


const wss = new WebSocketServer({ server: servers });
const clients = new Map();

wss.on('connection', function connection(ws: WebSocket, request: IncomingMessage, client: any) {
    if (request.url === '/virtual') {
        const webSocketClient = new WebSocketClient(ws, client);
        clients.set(client, webSocketClient);

        ws.on('close', () => {
            clients.delete(client);
        });
    }
});
