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
exports.ProductCategoryGroupController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_category_group_service_1 = require("./product-category-group.service");
const product_category_group_credentials_dto_1 = require("./dto/product-category-group.credentials.dto");
let ProductCategoryGroupController = class ProductCategoryGroupController {
    constructor(productCategoryGroupService) {
        this.productCategoryGroupService = productCategoryGroupService;
    }
    getAll(req) {
        return this.productCategoryGroupService.getAll();
    }
    create(productCategoryGroupCredentialsDto) {
        return this.productCategoryGroupService.create(productCategoryGroupCredentialsDto);
    }
    getTree() {
        return this.productCategoryGroupService.getCategoryGroupTree();
    }
};
__decorate([
    common_1.Get('/category-group'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductCategoryGroupController.prototype, "getAll", null);
__decorate([
    common_1.Post('/category-group'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_category_group_credentials_dto_1.ProductCategoryGroupCredentialsDto]),
    __metadata("design:returntype", void 0)
], ProductCategoryGroupController.prototype, "create", null);
__decorate([
    common_1.Get('/category-group/tree'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductCategoryGroupController.prototype, "getTree", null);
ProductCategoryGroupController = __decorate([
    swagger_1.ApiTags('Category-group'),
    common_1.Controller('product'),
    __metadata("design:paramtypes", [product_category_group_service_1.ProductCategoryGroupService])
], ProductCategoryGroupController);
exports.ProductCategoryGroupController = ProductCategoryGroupController;
//# sourceMappingURL=product-category-group.controller.js.map