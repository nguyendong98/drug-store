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
exports.ProductController = exports.storage = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const path = require("path");
const uuid_1 = require("uuid");
const platform_express_1 = require("@nestjs/platform-express");
const product_credentials_dto_1 = require("./dto/product.credentials.dto");
const product_service_1 = require("./product.service");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const api_implicit_param_decorator_1 = require("@nestjs/swagger/dist/decorators/api-implicit-param.decorator");
exports.storage = {
    storage: multer_1.diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuid_1.v4();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        }
    })
};
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getAll(query) {
        return this.productService.getAll(query);
    }
    create(productCredentialsDto) {
        return this.productService.create(productCredentialsDto);
    }
    async uploadedFile(file, _id) {
        return this.productService.updateProductImage(_id, file.filename);
    }
    async updatePrice(_id, price) {
        return this.productService.updateProductPrice(_id, price);
    }
    async serveAvatar(fileId, res) {
        res.sendFile(fileId, { root: 'uploads/products' });
    }
    getById(_id) {
        return this.productService.getById(_id);
    }
    createProfit(data) {
        return this.productService.createProfit(data);
    }
    updateProfit(id, data) {
        return this.productService.updateProfit(id, data);
    }
    getProfit() {
        return this.productService.getProfit();
    }
};
__decorate([
    common_1.Get(''),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAll", null);
__decorate([
    common_1.Post(''),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_credentials_dto_1.ProductCredentialsDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "create", null);
__decorate([
    api_implicit_param_decorator_1.ApiImplicitParam({ name: 'id', description: 'product id', required: true, type: String }),
    common_1.Put('/image/:id'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('image', exports.storage)),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "uploadedFile", null);
__decorate([
    common_1.Put('/price'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updatePrice", null);
__decorate([
    common_1.Get('/image/:fileId'),
    __param(0, common_1.Param('fileId')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "serveAvatar", null);
__decorate([
    api_implicit_param_decorator_1.ApiImplicitParam({ name: 'id', description: 'product id', required: true, type: String }),
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getById", null);
__decorate([
    roles_decorator_1.hasRoles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Post('/profit'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createProfit", null);
__decorate([
    roles_decorator_1.hasRoles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Put('/profit/:profitId'),
    __param(0, common_1.Param('profitId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateProfit", null);
__decorate([
    common_1.Get('/profit/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProfit", null);
ProductController = __decorate([
    swagger_1.ApiTags('Product'),
    common_1.Controller('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map