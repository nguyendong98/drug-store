import { ReceiptService } from './receipt.service';
export declare class ReceiptController {
    private receiptService;
    constructor(receiptService: ReceiptService);
    create(req: any, data: any): Promise<any>;
    getWarehouse(query: {
        idProduct?: string;
    }): Promise<any>;
}
