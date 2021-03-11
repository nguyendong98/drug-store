"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfitSchema = exports.ProductPriceSchema = exports.UnitSchema = exports.ProducerSchema = exports.TradeMarkSchema = exports.ProductSchema = void 0;
const mongoose = require("mongoose");
exports.ProductSchema = new mongoose.Schema({
    idCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product-category'
    },
    name: {
        type: String,
        unique: true
    },
    description: String,
    sku: String,
    keyword: String,
    image: String,
    contraindicated: String,
    dative: String,
    dosageAndUsage: String,
    preservation: String,
    ingredient: String,
    packing: String,
    idPrice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product-price'
    },
    idTradeMark: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trade-mark'
    },
    idProducer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'producer'
    },
    idUnit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'unit'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});
exports.TradeMarkSchema = new mongoose.Schema({
    origin: String,
    name: String
});
exports.ProducerSchema = new mongoose.Schema({
    name: String
});
exports.UnitSchema = new mongoose.Schema({
    name: String
});
exports.ProductPriceSchema = new mongoose.Schema({
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});
exports.ProfitSchema = new mongoose.Schema({
    profit: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});
//# sourceMappingURL=product.schema.js.map