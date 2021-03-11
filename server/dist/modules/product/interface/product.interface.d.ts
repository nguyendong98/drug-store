import { Document } from "mongoose";
export interface Product extends Document {
    readonly _id: string;
    readonly name: string;
    readonly image: string;
    readonly description: string;
    readonly sku: string;
    readonly keyword: string;
    readonly contraindicated: string;
    readonly dative: string;
    readonly dosageAndUsage: string;
    readonly preservation: string;
    readonly ingredient: string;
    readonly packing: string;
    readonly idTradeMark: string;
    readonly idProducer: string;
    readonly idUnit: string;
    idPrice: any;
    readonly createAt: string;
}
export interface TradeMark extends Document {
    readonly _id: string;
    readonly origin: string;
    readonly name: string;
}
export interface Producer extends Document {
    readonly _id: string;
    readonly name: string;
}
export interface Unit extends Document {
    readonly _id: string;
    readonly name: string;
}
export interface ProductResponse {
    readonly effectArrows: number;
}
export interface ProductPrice extends Document {
    readonly _id: string;
    readonly idProduct: string;
    readonly price: number;
    readonly createAt: string;
    readonly updateAt: string;
}
