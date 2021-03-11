import { ProductCategoryGroupService } from './product-category-group.service';
import { ProductCategoryGroupCredentialsDto } from './dto/product-category-group.credentials.dto';
export declare class ProductCategoryGroupController {
    private productCategoryGroupService;
    constructor(productCategoryGroupService: ProductCategoryGroupService);
    getAll(req: any): Promise<import("./interface/product-category-group.interface").ProductCategoryGroup[]>;
    create(productCategoryGroupCredentialsDto: ProductCategoryGroupCredentialsDto): Promise<Pick<import("./interface/product-category-group.interface").ProductCategoryGroup, "id">>;
    getTree(): Promise<any>;
}
