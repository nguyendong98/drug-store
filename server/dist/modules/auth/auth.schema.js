"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSchema = exports.AccountSchema = void 0;
const mongoose = require("mongoose");
exports.AccountSchema = new mongoose.Schema({
    fullName: String,
    username: {
        type: String,
        unique: true,
    },
    password: String,
    email: {
        type: String
    },
    phone: {
        type: String,
        unique: true
    },
    avatar: String,
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});
exports.RoleSchema = new mongoose.Schema({
    description: {
        type: String,
        unique: true
    }
});
//# sourceMappingURL=auth.schema.js.map