import { Document } from "mongoose";
export interface Feedback extends Document {
    readonly _id: string;
    readonly idProduct: string;
    readonly idAccount: string;
    readonly comment: string;
    readonly star: number;
    readonly createAt: string;
}
