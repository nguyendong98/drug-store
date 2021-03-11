import { ProductCategoryService } from './product-category.service';
import { ProductCategoryCredentialsDto } from './dto/product-category.credentials.dto';
export declare class ProductCategoryController {
    private productCategoryService;
    constructor(productCategoryService: ProductCategoryService);
    getAll(query?: {
        keyword?: string;
        'group-id'?: string;
    }): Promise<import("./interface/product-category.interface").ProductCategory[]>;
    getById(_id: string): Promise<import("./interface/product-category.interface").ProductCategory>;
    create(productCategoryCredentialsDto: ProductCategoryCredentialsDto): Promise<Pick<import("./interface/product-category.interface").ProductCategory, "id">>;
}
