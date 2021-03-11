"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const product_category_schema_1 = require("../product-category/product-category.schema");
const product_schema_1 = require("./product.schema");
const product_category_group_schema_1 = require("../product-category-group/product-category-group.schema");
const auth_schema_1 = require("../auth/auth.schema");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([
                { name: 'product', schema: product_schema_1.ProductSchema },
                { name: 'product-category', schema: product_category_schema_1.ProductCategorySchema },
                { name: 'product-category-group', schema: product_category_group_schema_1.ProductCategoryGroupSchema },
                { name: 'trade-mark', schema: product_schema_1.TradeMarkSchema },
                { name: 'producer', schema: product_schema_1.ProducerSchema },
                { name: 'unit', schema: product_schema_1.UnitSchema },
                { name: 'product-price', schema: product_schema_1.ProductPriceSchema },
                { name: 'profit', schema: product_schema_1.ProfitSchema },
                { name: 'role', schema: auth_schema_1.RoleSchema }
            ]),
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService],
        exports: [product_service_1.ProductService]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map