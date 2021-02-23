import * as mongoose from 'mongoose';

export const ProductCategorySchema = new mongoose.Schema({
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
