import { Schema, Types, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IWallet {
  userId: Types.ObjectId | string;
  amount: number;
  createdAt: Date;
  updateAt: Date;
}

// 2. Create a Schema corresponding to the document interface.
const walletSchema = new Schema<IWallet>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    amount: { type: Number, default: 200000 }
  },
  { timestamps: true }
);

export const Wallet = model<IWallet>("Wallet", walletSchema);