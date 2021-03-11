import { Connection, Model } from 'mongoose';
import { ProductCategory } from '../product-category/interface/product-category.interface';
import { Producer, Product, ProductPrice, ProductResponse, TradeMark, Unit } from './interface/product.interface';
import { ProductCredentialsDto } from './dto/product.credentials.dto';
import { ProductCategoryGroup } from '../product-category-group/interface/product-category-group.interface';
export declare class ProductService {
    private productCategoryGroupModel;
    private productCategoryModel;
    private productModel;
    private tradeMarkModel;
    private producerModel;
    private unitModel;
    private productPriceModel;
    private profitModel;
    private connection;
    constructor(productCategoryGroupModel: Model<ProductCategoryGroup>, productCategoryModel: Model<ProductCategory>, productModel: Model<Product>, tradeMarkModel: Model<TradeMark>, producerModel: Model<Producer>, unitModel: Model<Unit>, productPriceModel: Model<ProductPrice>, profitModel: Model<any>, connection: Connection);
    getAll(query: any): Promise<any>;
    create(productCredentialsDto: ProductCredentialsDto): Promise<Product>;
    updateProductImage(id: string, fileName: any): Promise<ProductResponse>;
    updateProductPrice(id: string, price: number): Promise<ProductResponse>;
    getById(id: string): Promise<Product>;
    getProfit(): Promise<any[]>;
    createProfit(data: {
        profit: number;
    }): Promise<any>;
    updateProfit(id: string, data: {
        profit: number;
    }): Promise<any>;
}
