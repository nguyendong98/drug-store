import {ConflictException, Injectable} from '@nestjs/common';
import {InjectConnection, InjectModel} from '@nestjs/mongoose';
import {Connection, Model} from 'mongoose';
import {ProductCategoryGroup} from './interface/product-category-group.interface';
import {ProductCategoryGroupCredentialsDto} from './dto/product-category-group.credentials.dto';
import {ProductCategory} from '../product-category/interface/product-category.interface';
@Injectable()
export class ProductCategoryGroupService {
    constructor(
        @InjectModel('product-category-group') private productCategoryGroupModel: Model<ProductCategoryGroup>,
        @InjectModel('product-category') private productCategoryModel: Model<ProductCategory>,
        @InjectConnection() private connection: Connection,
    ) {
    }

    // @route    GET product/category-group
    // @desc     get all product-category-group
    // @access   public
    async getAll(): Promise<ProductCategoryGroup[]> {
        return this.productCategoryGroupModel.find();
    }

    // @route    POST product/category-group
    // @desc     create product-category-group
    // @access   private
    async create(productCategoryGroupCredentialsDto: ProductCategoryGroupCredentialsDto): Promise<Pick<ProductCategoryGroup, 'id'>> {
        const { name, description } = productCategoryGroupCredentialsDto;
        const productCategoryGroup = new this.productCategoryGroupModel({
            name,
            description
        })
        try {
            await productCategoryGroup.save();
            return { id: productCategoryGroup._id };
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Conflict');
            }
            throw error;
        }
    }

    // @route    GET product/category-group/tree
    // @desc     get product-category-tree
    // @access   public
    async getCategoryGroupTree(): Promise<any> {
        try {
            const categoryGroup = await this.productCategoryGroupModel.find();
            let data = [...categoryGroup];
            let i = 0;
            for (const item of categoryGroup) {

                const category = await this.productCategoryModel.find({idGroup: item._id});
                for (const value of category) {
                     data[i].categories.push(value);
                }
                i++;
            }
            return data;
        } catch (e) {
            throw e;
        }
    }


}
