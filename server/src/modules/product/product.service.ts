import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from '@nestjs/mongoose';
import {Connection, Model} from 'mongoose';
import {ProductCategory} from '../product-category/interface/product-category.interface';
import {Producer, Product, ProductPrice, ProductResponse, TradeMark, Unit} from './interface/product.interface';
import {ProductCredentialsDto} from './dto/product.credentials.dto';
import {ProductCategoryGroup} from '../product-category-group/interface/product-category-group.interface';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('product-category-group') private productCategoryGroupModel: Model<ProductCategoryGroup>,
        @InjectModel('product-category') private productCategoryModel: Model<ProductCategory>,
        @InjectModel('product') private productModel: Model<Product>,
        @InjectModel('trade-mark') private tradeMarkModel: Model<TradeMark>,
        @InjectModel('producer') private producerModel: Model<Producer>,
        @InjectModel('unit') private unitModel: Model<Unit>,
        @InjectModel('product-price') private productPriceModel: Model<ProductPrice>,
        @InjectModel('profit') private profitModel: Model<any>,
        @InjectConnection() private connection: Connection,
    ) {}

    // @route    GET product?query=
    // @desc     get product by query
    // @access   public
    async getAll(query): Promise<any> {
        if (!query.keyword) query.keyword = '';
        if (!query.pageSize) query.pageSize = 16;
        if (!query.pageNumber) query.pageNumber = 1;
        if (!query.category) {
            const totalElement = await this.productModel.countDocuments({name: new RegExp(query.keyword, "i")});
            try {
                const result = await this.productModel.find({name: new RegExp(query.keyword, "i")})
                    .skip((Number(query.pageNumber) * Number(query.pageSize)) - Number(query.pageSize))
                    .populate({
                            path: 'idCategory',
                            populate: { path: 'idGroup' }
                        }
                    )
                    .populate({
                        path: 'idPrice'
                    })
                    .populate({
                        path: 'idUnit'
                    })
                    .limit(Number(query.pageSize))
                    .exec();
                return {
                    result,
                    pageNumber: Number(query.pageNumber),
                    pageSize: Number(query.pageSize),
                    total: result.length,
                    totalElement,
                    totalPage: Math.ceil(totalElement/Number(query.pageSize))
                };
            } catch (e) {
                return this.productModel.find();
            }
        }

        const totalElement = await this.productModel.countDocuments({$and: [{idCategory: query.category}, {name: new RegExp(query.keyword, "i")}]});

        try {
            const result = await this.productModel.find({$and: [{idCategory: query.category}, {name: new RegExp(query.keyword, "i")}]})
                .populate({
                        path: 'idCategory',
                        populate: { path: 'idGroup' }
                    }
                )
                .populate({
                    path: 'idUnit'
                })
                .populate({
                    path: 'idPrice'
                })
                .skip((Number(query.pageNumber) * Number(query.pageSize)) - Number(query.pageSize))
                .limit(Number(query.pageSize))
                .exec();
            return {
                result,
                pageNumber: Number(query.pageNumber),
                pageSize: Number(query.pageSize),
                total: result.length,
                totalElement,
                totalPage: Math.ceil(totalElement/Number(query.pageSize))
            };
        } catch (e) {
            return this.productModel.find();
        }

    }

    // @route    POST product
    // @desc     create product
    // @access   private
    async create(productCredentialsDto: ProductCredentialsDto): Promise<Product> {
        const {
            idCategory,
            name,
            description,
            sku,
            keyword,
            contraindicated,
            dative,
            dosageAndUsage,
            preservation,
            ingredient,
            packing,
            idTradeMark,
            idProducer,
            idUnit,
            price
        } = productCredentialsDto;
        const category = await this.productCategoryModel.findById(idCategory);
        const tradeMark = await this.tradeMarkModel.findById(idTradeMark);
        const producer = await this.producerModel.findById(idProducer);
        const unit = await this.unitModel.findById(idUnit);
        if (!category || !tradeMark || !producer || !unit  ) {
            throw new NotFoundException('Not found');
        }
        const product = new this.productModel({
            idCategory: category,
            name,
            description,
            sku,
            keyword,
            image: null,
            contraindicated,
            dative,
            dosageAndUsage,
            preservation,
            ingredient,
            packing,
            idTradeMark: tradeMark,
            idProducer: producer,
            idUnit: unit
        })
        try {
            if (product && product._id) {
                const product_price = new this.productPriceModel({
                    idProduct: product,
                    price,
                    createAt: (new Date()).toISOString(),
                    updateAt: null
                })
                await product_price.save();
                product.idPrice = product_price._id;
                await product.save();
            }
            await product.save();
            return product;
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Conflict');
            }
        }
    }

    // @route    PUT product
    // @desc     get all product
    // @access   public
    async updateProductImage(id: string, fileName): Promise<ProductResponse> {
        try {
            await this.productModel.findByIdAndUpdate(id, {
                image: fileName
            }, {
                new: true,
                upsert: false,
                runValidators: true
            });
            return { effectArrows: 1 };
        } catch (error) {
            throw error;
        }
    }

    // @route    PUT product
    // @desc     get all product
    // @access   public

    async updateProductPrice(id: string, price: number): Promise<ProductResponse> {
        try {
            await this.productPriceModel.findByIdAndUpdate(id, {
                price: price
            }, {
                new: true,
                upsert: false,
                runValidators: true
            });
            return { effectArrows: 1 };
        } catch (error) {
            throw error;
        }
    }
    // @route    POST product
    // @desc     create product
    // @access   private

    // @route    GET product/view/:id
    // @desc     get product detail
    // @access   public
    async getById(id: string): Promise<Product> {
        try {
            return this.productModel.findById(id).populate({
                    path: 'idCategory',
                    populate: { path: 'idGroup' }
                }
            )
                .populate({path: 'idTradeMark'})
                .populate({path: 'idProducer'})
                .populate({path: 'idUnit'})
                .populate({path: 'idPrice'}).exec();
        } catch (e) {
            throw e;
        }
    }

    async getProfit() {
        try {
            const res = await this.profitModel.find();
            return res;
        } catch (e) {
            throw e;
        }
    }


    async createProfit(data: {
        profit: number
    }): Promise<any> {
        const profit = Number(data.profit);
        try {
            const data = new this.profitModel({
                profit
            })
            await data.save();
            return data;
        } catch (e) {
            throw e;
        }
    }

    async  updateProfit(id: string, data: { profit: number }) {
        const profit = Number(data.profit);
        try {
            const res = await this.profitModel.findByIdAndUpdate(id, {
                profit
            }, {
                new: true,
                upsert: false,
                runValidators: true
            })
            return res;
        } catch (e) {
            throw e;
        }
    }
}
