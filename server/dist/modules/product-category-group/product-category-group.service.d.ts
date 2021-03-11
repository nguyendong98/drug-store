import { Connection, Model } from 'mongoose';
import { ProductCategoryGroup } from './interface/product-category-group.interface';
import { ProductCategoryGroupCredentialsDto } from './dto/product-category-group.credentials.dto';
import { ProductCategory } from '../product-category/interface/product-category.interface';
export declare class ProductCategoryGroupService {
    private productCategoryGroupModel;
    private productCategoryModel;
    private connection;
    constructor(productCategoryGroupModel: Model<ProductCategoryGroup>, productCategoryModel: Model<ProductCategory>, connection: Connection);
    getAll(): Promise<ProductCategoryGroup[]>;
    create(productCategoryGroupCredentialsDto: ProductCategoryGroupCredentialsDto): Promise<Pick<ProductCategoryGroup, 'id'>>;
    getCategoryGroupTree(): Promise<any>;
}
