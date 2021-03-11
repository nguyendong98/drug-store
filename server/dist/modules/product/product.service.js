"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductService = class ProductService {
    constructor(productCategoryGroupModel, productCategoryModel, productModel, tradeMarkModel, producerModel, unitModel, productPriceModel, profitModel, connection) {
        this.productCategoryGroupModel = productCategoryGroupModel;
        this.productCategoryModel = productCategoryModel;
        this.productModel = productModel;
        this.tradeMarkModel = tradeMarkModel;
        this.producerModel = producerModel;
        this.unitModel = unitModel;
        this.productPriceModel = productPriceModel;
        this.profitModel = profitModel;
        this.connection = connection;
    }
    async getAll(query) {
        if (!query.keyword) {
            query.keyword = "";
        }
        if (!query.category) {
            const totalElement = await this.productModel.countDocuments({ name: new RegExp(query.keyword, "i") });
            try {
                const result = await this.productModel.find({ name: new RegExp(query.keyword, "i") })
                    .skip((Number(query.pageNumber) * Number(query.pageSize)) - Number(query.pageSize))
                    .populate({
                    path: 'idCategory',
                    populate: { path: 'idGroup' }
                })
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
                    totalPage: Math.ceil(totalElement / Number(query.pageSize))
                };
            }
            catch (e) {
                return this.productModel.find();
            }
        }
        if (!query.pageSize) {
            query.pageSize = 16;
        }
        if (!query.pageNumber) {
            query.pageNumber = 1;
        }
        const totalElement = await this.productModel.countDocuments({ $and: [{ idCategory: query.category }, { name: new RegExp(query.keyword, "i") }] });
        try {
            const result = await this.productModel.find({ $and: [{ idCategory: query.category }, { name: new RegExp(query.keyword, "i") }] })
                .populate({
                path: 'idCategory',
                populate: { path: 'idGroup' }
            })
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
                totalPage: Math.ceil(totalElement / Number(query.pageSize))
            };
        }
        catch (e) {
            return this.productModel.find();
        }
    }
    async create(productCredentialsDto) {
        const { idCategory, name, description, sku, keyword, contraindicated, dative, dosageAndUsage, preservation, ingredient, packing, idTradeMark, idProducer, idUnit, price } = productCredentialsDto;
        const category = await this.productCategoryModel.findById(idCategory);
        const tradeMark = await this.tradeMarkModel.findById(idTradeMark);
        const producer = await this.producerModel.findById(idProducer);
        const unit = await this.unitModel.findById(idUnit);
        if (!category || !tradeMark || !producer || !unit) {
            throw new common_1.NotFoundException('Not found');
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
        });
        try {
            if (product && product._id) {
                const product_price = new this.productPriceModel({
                    idProduct: product,
                    price,
                    createAt: (new Date()).toISOString(),
                    updateAt: null
                });
                await product_price.save();
                product.idPrice = product_price._id;
                await product.save();
            }
            await product.save();
            return product;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Conflict');
            }
        }
    }
    async updateProductImage(id, fileName) {
        try {
            await this.productModel.findByIdAndUpdate(id, {
                image: fileName
            }, {
                new: true,
                upsert: false,
                runValidators: true
            });
            return { effectArrows: 1 };
        }
        catch (error) {
            throw error;
        }
    }
    async updateProductPrice(id, price) {
        try {
            await this.productPriceModel.findByIdAndUpdate(id, {
                price: price
            }, {
                new: true,
                upsert: false,
                runValidators: true
            });
            return { effectArrows: 1 };
        }
        catch (error) {
            throw error;
        }
    }
    async getById(id) {
        try {
            return this.productModel.findById(id).populate({
                path: 'idCategory',
                populate: { path: 'idGroup' }
            })
                .populate({ path: 'idTradeMark' })
                .populate({ path: 'idProducer' })
                .populate({ path: 'idUnit' })
                .populate({ path: 'idPrice' }).exec();
        }
        catch (e) {
            throw e;
        }
    }
    async getProfit() {
        try {
            const res = await this.profitModel.find();
            return res;
        }
        catch (e) {
            throw e;
        }
    }
    async createProfit(data) {
        const profit = Number(data.profit);
        try {
            const data = new this.profitModel({
                profit
            });
            await data.save();
            return data;
        }
        catch (e) {
            throw e;
        }
    }
    async updateProfit(id, data) {
        const profit = Number(data.profit);
        try {
            const res = await this.profitModel.findByIdAndUpdate(id, {
                profit
            }, {
                new: true,
                upsert: false,
                runValidators: true
            });
            return res;
        }
        catch (e) {
            throw e;
        }
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('product-category-group')),
    __param(1, mongoose_1.InjectModel('product-category')),
    __param(2, mongoose_1.InjectModel('product')),
    __param(3, mongoose_1.InjectModel('trade-mark')),
    __param(4, mongoose_1.InjectModel('producer')),
    __param(5, mongoose_1.InjectModel('unit')),
    __param(6, mongoose_1.InjectModel('product-price')),
    __param(7, mongoose_1.InjectModel('profit')),
    __param(8, mongoose_1.InjectConnection()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Connection])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map