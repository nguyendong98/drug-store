"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryGroupSchema = void 0;
const mongoose = require("mongoose");
exports.ProductCategoryGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    categories: Array,
    description: String,
    createAt: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=product-category-group.schema.js.map