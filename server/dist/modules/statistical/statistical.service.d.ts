import { Model } from "mongoose";
import { Order, OrderDetail } from '../order/interface/order.interface';
import { Account } from '../auth/interface/auth.interface';
export declare class StatisticalService {
    private orderModel;
    private orderDetailModel;
    private receiptModel;
    private accountModel;
    constructor(orderModel: Model<Order>, orderDetailModel: Model<OrderDetail>, receiptModel: Model<any>, accountModel: Model<Account>);
    getRevenue(query: {
        year: any;
    }): Promise<any>;
    getRevenueByDate(query: {
        from: any;
        to: any;
    }): Promise<any>;
    getUserByMonth(query: {
        month: any;
        year: any;
    }): Promise<any>;
}
