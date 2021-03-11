"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalarySchema = exports.TimeKeepingSchema = exports.WorkShiftSchema = void 0;
const mongoose = require("mongoose");
exports.WorkShiftSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    startTime: String,
    endTime: String,
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: Date
});
exports.TimeKeepingSchema = new mongoose.Schema({
    idStaff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    },
    idWorkShift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'work-shift'
    },
    date: Date,
    completed: Boolean,
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: Date
});
exports.SalarySchema = new mongoose.Schema({
    valueOfHour: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});
//# sourceMappingURL=time-keeping.schema.js.map