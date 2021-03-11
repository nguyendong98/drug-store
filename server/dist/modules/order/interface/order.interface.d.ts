import { Document } from "mongoose";
export interface Order extends Document {
    readonly _id: string;
    readonly customer: string;
    readonly staff: string;
    readonly bill: BillItem[];
    readonly totalAmount: number;
    readonly orderStatus: string;
    readonly paymentType: string;
    idOrderDetail: any;
    readonly createAt: string;
}
export interface BillItem extends Document {
    readonly _id: string;
    readonly product: string;
    readonly name: string;
    readonly price: number;
    readonly qty: number;
}
export interface OrderDetail extends Document {
    readonly _id: string;
    readonly idOrder: string;
    readonly bill: BillItem[];
    readonly customerName: string;
    readonly phone: string;
    readonly email: string;
    readonly address: string;
    readonly note: string;
    readonly payerInfo: object;
    readonly createAt: string;
}
