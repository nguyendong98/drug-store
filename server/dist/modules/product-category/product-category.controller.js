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
exports.ProductCategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_category_service_1 = require("./product-category.service");
const product_category_credentials_dto_1 = require("./dto/product-category.credentials.dto");
const api_implicit_query_decorator_1 = require("@nestjs/swagger/dist/decorators/api-implicit-query.decorator");
const api_implicit_param_decorator_1 = require("@nestjs/swagger/dist/decorators/api-implicit-param.decorator");
let ProductCategoryController = class ProductCategoryController {
    constructor(productCategoryService) {
        this.productCategoryService = productCategoryService;
    }
    getAll(query) {
        return this.productCategoryService.getAll(query);
    }
    getById(_id) {
        return this.productCategoryService.getCategoryDetail(_id);
    }
    create(productCategoryCredentialsDto) {
        return this.productCategoryService.create(productCategoryCredentialsDto);
    }
};
__decorate([
    api_implicit_query_decorator_1.ApiImplicitQuery({ name: 'group-id', type: String }),
    common_1.Get('/category'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductCategoryController.prototype, "getAll", null);
__decorate([
    api_implicit_param_decorator_1.ApiImplicitParam({ name: 'id', description: 'product id', required: true, type: String }),
    common_1.Get('/category/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductCategoryController.prototype, "getById", null);
__decorate([
    common_1.Post('/category'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_category_credentials_dto_1.ProductCategoryCredentialsDto]),
    __metadata("design:returntype", void 0)
], ProductCategoryController.prototype, "create", null);
ProductCategoryController = __decorate([
    swagger_1.ApiTags('Category'),
    common_1.Controller('product'),
    __metadata("design:paramtypes", [product_category_service_1.ProductCategoryService])
], ProductCategoryController);
exports.ProductCategoryController = ProductCategoryController;
//# sourceMappingURL=product-category.controller.js.map