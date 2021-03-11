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
exports.ProductCategoryGroupService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductCategoryGroupService = class ProductCategoryGroupService {
    constructor(productCategoryGroupModel, productCategoryModel, connection) {
        this.productCategoryGroupModel = productCategoryGroupModel;
        this.productCategoryModel = productCategoryModel;
        this.connection = connection;
    }
    async getAll() {
        return this.productCategoryGroupModel.find();
    }
    async create(productCategoryGroupCredentialsDto) {
        const { name, description } = productCategoryGroupCredentialsDto;
        const productCategoryGroup = new this.productCategoryGroupModel({
            name,
            description
        });
        try {
            await productCategoryGroup.save();
            return { id: productCategoryGroup._id };
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Conflict');
            }
            throw error;
        }
    }
    async getCategoryGroupTree() {
        try {
            const categoryGroup = await this.productCategoryGroupModel.find();
            let data = [...categoryGroup];
            let i = 0;
            for (const item of categoryGroup) {
                const category = await this.productCategoryModel.find({ idGroup: item._id });
                for (const value of category) {
                    data[i].categories.push(value);
                }
                i++;
            }
            return data;
        }
        catch (e) {
            throw e;
        }
    }
};
ProductCategoryGroupService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('product-category-group')),
    __param(1, mongoose_1.InjectModel('product-category')),
    __param(2, mongoose_1.InjectConnection()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Connection])
], ProductCategoryGroupService);
exports.ProductCategoryGroupService = ProductCategoryGroupService;
//# sourceMappingURL=product-category-group.service.js.map