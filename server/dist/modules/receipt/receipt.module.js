"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptModule = void 0;
const common_1 = require("@nestjs/common");
const receipt_controller_1 = require("./receipt.controller");
const receipt_service_1 = require("./receipt.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("../product/product.schema");
const receipt_schema_1 = require("./receipt.schema");
const auth_schema_1 = require("../auth/auth.schema");
let ReceiptModule = class ReceiptModule {
};
ReceiptModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([
                { name: 'product', schema: product_schema_1.ProductSchema },
                { name: 'receipt', schema: receipt_schema_1.ReceiptSchema },
                { name: 'receipt-detail', schema: receipt_schema_1.ReceiptDetailSchema },
                { name: 'warehouse', schema: receipt_schema_1.WarehouseSchema },
                { name: 'account', schema: auth_schema_1.AccountSchema },
                { name: 'role', schema: auth_schema_1.RoleSchema },
            ]),
        ],
        controllers: [receipt_controller_1.ReceiptController],
        providers: [receipt_service_1.ReceiptService],
        exports: [receipt_service_1.ReceiptService]
    })
], ReceiptModule);
exports.ReceiptModule = ReceiptModule;
//# sourceMappingURL=receipt.module.js.map