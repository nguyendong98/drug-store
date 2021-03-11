"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategorySchema = void 0;
const mongoose = require("mongoose");
exports.ProductCategorySchema = new mongoose.Schema({
    idGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product-category-groups'
    },
    name: {
        type: String,
        unique: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=product-category.schema.js.map