import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
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

export const RoleSchema = new mongoose.Schema({
    description: {
        type: String,
        unique: true
    }
});
