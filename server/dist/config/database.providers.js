"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const mongoose = require("mongoose");
exports.databaseProviders = [
    {
        useFactory: async () => {
            mongoose.Promise = global.Promise;
            return await mongoose.connect('mongodb://localhost:27017/parley');
        },
    },
];
//# sourceMappingURL=database.providers.js.map