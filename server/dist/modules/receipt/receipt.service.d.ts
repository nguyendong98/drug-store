import { Model } from "mongoose";
import { Product } from '../product/interface/product.interface';
import { Account } from '../auth/interface/auth.interface';
export declare class ReceiptService {
    private productModel;
    private accountModel;
    private receiptModel;
    private receiptDetailModel;
    private warehouseModel;
    constructor(productModel: Model<Product>, accountModel: Model<Account>, receiptModel: Model<any>, receiptDetailModel: Model<any>, warehouseModel: Model<any>);
    createReceipt(id: string, data: any): Promise<any>;
    getWarehouse(query: {
        idProduct?: string;
    }): Promise<any>;
}
