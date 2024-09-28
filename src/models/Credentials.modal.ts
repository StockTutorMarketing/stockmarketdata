import { Schema, Types, model } from "mongoose";

export interface Credentials {
    Apikey: string ;
    accesToken: string;
  createdAt: Date;
  updateAt: Date;
}

const Credentials = new Schema<Credentials>(
  {
    Apikey: { type: String, ref: 'Users' },
    accesToken: { type: String}
  },
  { timestamps: true }
);

export const zerodhaCredentials = model<Credentials>("ZerodhaCredentials", Credentials)