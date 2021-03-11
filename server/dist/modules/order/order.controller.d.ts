import { OrderService } from './order.service';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    getAll(query?: {
        pageNumber?: number;
        pageSize?: number;
    }): Promise<any>;
    create(req: any, data: any): Promise<import("./interface/order.interface").Order>;
    approveOrder(req: any, data: {
        id: string;
        orderStatus: string;
        email: string;
    }[]): Promise<any>;
    getById(_id: string): Promise<import("./interface/order.interface").Order>;
    createNow(req: any, data: any): Promise<any>;
}
