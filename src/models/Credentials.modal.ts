import { Schema, Types, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface Credentials {
    Apikey: string ;
    accesToken: string;
  createdAt: Date;
  updateAt: Date;
}

// 2. Create a Schema corresponding to the document interface.
const Credentials = new Schema<Credentials>(
  {
    Apikey: { type: String, ref: 'Users' },
    accesToken: { type: String}
  },
  { timestamps: true }
);

export const zerodhaCredentials = model<Credentials>("ZerodhaCredentials", Credentials)