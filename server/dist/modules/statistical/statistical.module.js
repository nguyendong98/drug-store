"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticalModule = void 0;
const common_1 = require("@nestjs/common");
const statistical_controller_1 = require("./statistical.controller");
const statistical_service_1 = require("./statistical.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const order_schema_1 = require("../order/order.schema");
const auth_schema_1 = require("../auth/auth.schema");
const receipt_schema_1 = require("../receipt/receipt.schema");
let StatisticalModule = class StatisticalModule {
};
StatisticalModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([
                { name: 'order', schema: order_schema_1.OrderSchema },
                { name: 'order-detail', schema: order_schema_1.orderDetailSchema },
                { name: 'role', schema: auth_schema_1.RoleSchema },
                { name: 'receipt', schema: receipt_schema_1.ReceiptSchema },
                { name: 'account', schema: auth_schema_1.AccountSchema }
            ]),
        ],
        controllers: [statistical_controller_1.StatisticalController],
        providers: [statistical_service_1.StatisticalService],
        exports: [statistical_service_1.StatisticalService]
    })
], StatisticalModule);
exports.StatisticalModule = StatisticalModule;
//# sourceMappingURL=statistical.module.js.map