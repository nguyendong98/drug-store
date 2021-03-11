"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDetailSchema = exports.OrderSchema = void 0;
const mongoose = require("mongoose");
exports.OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    },
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    },
    totalAmount: Number,
    paymentType: String,
    orderStatus: String,
    idOrderDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order-detail'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});
exports.orderDetailSchema = new mongoose.Schema({
    idOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },
    bill: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            name: String,
            price: Number,
            qty: Number
        }
    ],
    customerName: String,
    phone: String,
    email: String,
    address: String,
    note: String,
    payerInfo: Object,
    createAt: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=order.schema.js.map