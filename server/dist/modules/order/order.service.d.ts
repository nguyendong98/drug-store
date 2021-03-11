import { Model } from "mongoose";
import { Product } from '../product/interface/product.interface';
import { Account } from '../auth/interface/auth.interface';
import { Order, OrderDetail } from './interface/order.interface';
export declare class OrderService {
    private productModel;
    private accountModel;
    private orderModel;
    private orderDetailModel;
    private warehouseModel;
    constructor(productModel: Model<Product>, accountModel: Model<Account>, orderModel: Model<Order>, orderDetailModel: Model<OrderDetail>, warehouseModel: Model<any>);
    getAll(query: any): Promise<any>;
    create(idUser: string, data: any): Promise<Order>;
    approveOrder(id: string, data: {
        id: string;
        email: string;
        orderStatus: string;
    }[]): Promise<any>;
    getDetail(id: string): Promise<Order>;
    createOrderNow(id: string, data: any): Promise<any>;
}
