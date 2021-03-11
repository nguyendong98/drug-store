"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const config_module_1 = require("../config/config.module");
const config_service_1 = require("../config/config.service");
const mongoose_1 = require("@nestjs/mongoose");
exports.databaseProviders = [
    mongoose_1.MongooseModule.forRootAsync({
        imports: [config_module_1.ConfigModule],
        inject: [config_service_1.ConfigService],
        useFactory: async (config) => ({
            uri: config.get('MONGODB_URI'),
            useNewUrlParser: true,
        }),
    }),
];
//# sourceMappingURL=database.providers.js.map