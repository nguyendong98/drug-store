import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from '@nestjs/mongoose';
import {Connection, Model} from 'mongoose';
import {ProductCategory} from './interface/product-category.interface';
import {ProductCategoryCredentialsDto} from './dto/product-category.credentials.dto';
import {ProductCategoryGroup} from '../product-category-group/interface/product-category-group.interface';
import {options} from 'tsconfig-paths/lib/options';

@Injectable()
export class ProductCategoryService {
    constructor(
        @InjectModel('product-category') private productCategoryModel: Model<ProductCategory>,
        @InjectModel('product-category-groups') private productCategoryGroupModel: Model<ProductCategoryGroup>,
        @InjectConnection() private connection: Connection,
    ) {}

    // @route    GET product/category
    // @desc     get all product-category
    // @access   public
    async getAll(query): Promise<ProductCategory[]> {
        if (query && query['group-id']) {
            try {
                return this.productCategoryModel.find({idGroup: query['group-id']});
            } catch (e) {
                return this.productCategoryModel.find();
            }
        }
        return this.productCategoryModel.find();
    }

    // @route    POST product/category
    // @desc     create product-category
    // @access   public
    async getCategoryDetail(id: string): Promise<ProductCategory> {
        try {
            return this.productCategoryModel.findById(id)
                                            .populate({
                                                path: 'idGroup',
                                                select: 'name'
                                            }).exec();
        } catch (e) {
            throw e;
        }
    }

    // @route    POST product/category
    // @desc     create product-category
    // @access   public
    async create(productCategoryCredentialsDto: ProductCategoryCredentialsDto): Promise<Pick<ProductCategory, 'id'>> {
        const {idGroup, name} = productCategoryCredentialsDto;
        const groupCategory = await this.productCategoryGroupModel.findById(idGroup).select('_id');
        if (!groupCategory) {
            throw new NotFoundException('Not found');
        }
        const productCategory = new this.productCategoryModel({
            idGroup: groupCategory,
            name
        })
        try {
            await productCategory.save();
            return { id: productCategory._id };
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Conflict');
            }
        }
    }
}
