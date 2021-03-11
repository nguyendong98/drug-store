import { Connection, Model } from 'mongoose';
import { ProductCategory } from './interface/product-category.interface';
import { ProductCategoryCredentialsDto } from './dto/product-category.credentials.dto';
import { ProductCategoryGroup } from '../product-category-group/interface/product-category-group.interface';
export declare class ProductCategoryService {
    private productCategoryModel;
    private productCategoryGroupModel;
    private connection;
    constructor(productCategoryModel: Model<ProductCategory>, productCategoryGroupModel: Model<ProductCategoryGroup>, connection: Connection);
    getAll(query: any): Promise<ProductCategory[]>;
    getCategoryDetail(id: string): Promise<ProductCategory>;
    create(productCategoryCredentialsDto: ProductCategoryCredentialsDto): Promise<Pick<ProductCategory, 'id'>>;
}
