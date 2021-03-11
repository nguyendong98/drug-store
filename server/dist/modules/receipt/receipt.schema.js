"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseSchema = exports.ReceiptDetailSchema = exports.ReceiptSchema = void 0;
const mongoose = require("mongoose");
exports.ReceiptSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    },
    totalAmount: Number,
    createAt: {
        type: Date,
        default: Date.now
    }
});
exports.ReceiptDetailSchema = new mongoose.Schema({
    idReceipt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'receipt'
    },
    bill: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            qty: Number,
            price: Number
        }
    ],
    expireDate: Date
});
exports.WarehouseSchema = new mongoose.Schema({
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    qty: Number,
    expiryDate: Date
});
//# sourceMappingURL=receipt.schema.js.map