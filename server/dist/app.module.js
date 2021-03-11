"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./modules/auth/auth.module");
const product_category_group_module_1 = require("./modules/product-category-group/product-category-group.module");
const product_category_module_1 = require("./modules/product-category/product-category.module");
const product_module_1 = require("./modules/product/product.module");
const feedback_module_1 = require("./modules/feedback/feedback.module");
const order_module_1 = require("./modules/order/order.module");
const nest_sendgrid_1 = require("@anchan828/nest-sendgrid");
const receipt_module_1 = require("./modules/receipt/receipt.module");
const statistical_module_1 = require("./modules/statistical/statistical.module");
const time_keeping_module_1 = require("./modules/time-keeping/time-keeping.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_ATLAS, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }),
            nest_sendgrid_1.SendGridModule.forRoot({
                apikey: process.env.SENDGRID_API_KEY
            }),
            auth_module_1.AuthModule,
            product_category_group_module_1.ProductCategoryGroupModule,
            product_category_module_1.ProductCategoryModule,
            product_module_1.ProductModule,
            feedback_module_1.FeedbackModule,
            order_module_1.OrderModule,
            receipt_module_1.ReceiptModule,
            statistical_module_1.StatisticalModule,
            time_keeping_module_1.TimeKeepingModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map