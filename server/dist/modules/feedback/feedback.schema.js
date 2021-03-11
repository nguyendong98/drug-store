"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackSchema = void 0;
const mongoose = require("mongoose");
exports.FeedbackSchema = new mongoose.Schema({
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    idAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    },
    comment: String,
    star: Number,
    createAt: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=feedback.schema.js.map