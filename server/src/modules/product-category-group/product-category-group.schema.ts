import * as mongoose from 'mongoose';

export const ProductCategoryGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    categories: Array,
    description: String,
    createAt: {
        type: Date,
        default: Date.now
    }
});
