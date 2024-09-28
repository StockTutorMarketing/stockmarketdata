import { Schema, Types, model } from "mongoose";
import { VIRTUAL_TRADING_DELIVERY_TYPE, VIRTUAL_TRADING_ORDER_STATUS, VIRTUAL_TRADING_ORDER_TRADE_TYPE, VIRTUAL_TRADING_ORDER_TYPE } from "../common/constant.common";

export interface IVirtualOrder {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  instrument_token: string,
  instrument_symbol:string,
  bought_qty: number;
  individualPurchasePrice: number; 
  instrument_name: string,
  totalPurchasePrice: number;

  triggerPrice: number;

  order_type: VIRTUAL_TRADING_ORDER_TYPE,
  delivery_type: VIRTUAL_TRADING_DELIVERY_TYPE,
  order_trade_type: VIRTUAL_TRADING_ORDER_TRADE_TYPE,

  order_status: VIRTUAL_TRADING_ORDER_STATUS

  // +
  is_interaday_sold: boolean;
  is_sent_to_holding: boolean;

  reason: string;
  avg_Price: number

  createdAt: Date;
  updateAt: Date;
  orderId: string;
}


// 2. Create a Schema corresponding to the document interface.
const VirtualTradingOrderSchema = new Schema<IVirtualOrder>(
  {
    userId: Schema.Types.ObjectId,

    instrument_token: String,
    individualPurchasePrice: Number,
    instrument_name: String,
    totalPurchasePrice: Number,
    bought_qty: Number,
    avg_Price: Number,
    triggerPrice: Number,

    order_type: {
      type: String,
      default: "BUY"
    },

    delivery_type: {
      type: String,
      default: "DELIVERY"
    },
    order_trade_type: {
      type: String,
      default: "MARKET"
    },
    order_status: {
      type: String,
      default: "INITIATED"
    },

    is_interaday_sold: {
      type: Boolean,
      default: false
    },

    is_sent_to_holding: {
      type: Boolean,
      default: false
    },

    reason: {
      type: String,
      default: ""
    },

    orderId: {
      type: String,
      required: false,
      unique: true
    }
  },
  { timestamps: true }
);

export const VirtualTradingOrder = model<IVirtualOrder>("VirtualTradeOrder", VirtualTradingOrderSchema);
