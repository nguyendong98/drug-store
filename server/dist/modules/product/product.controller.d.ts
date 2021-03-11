import { ProductCredentialsDto } from './dto/product.credentials.dto';
import { ProductService } from './product.service';
import { Product } from './interface/product.interface';
export declare const storage: {
    storage: any;
};
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getAll(query?: {
        keyword?: string;
        category?: string;
        pageNumber?: number;
        pageSize?: number;
    }): Promise<any>;
    create(productCredentialsDto: ProductCredentialsDto): Promise<Product>;
    uploadedFile(file: any, _id: string): Promise<import("./interface/product.interface").ProductResponse>;
    updatePrice(_id: string, price: number): Promise<import("./interface/product.interface").ProductResponse>;
    serveAvatar(fileId: any, res: any): Promise<any>;
    getById(_id: string): Promise<Product>;
    createProfit(data: {
        profit: number;
    }): Promise<any>;
    updateProfit(id: any, data: {
        profit: any;
    }): Promise<any>;
    getProfit(): Promise<any[]>;
}
