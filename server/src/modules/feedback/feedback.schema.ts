import * as mongoose from 'mongoose';

export const FeedbackSchema = new mongoose.Schema({
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

