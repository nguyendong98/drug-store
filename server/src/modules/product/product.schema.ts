import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
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

export const TradeMarkSchema = new mongoose.Schema({
    origin: String,
    name: String
});

export const ProducerSchema = new mongoose.Schema({
    name: String
});

export const UnitSchema = new mongoose.Schema({
    name: String
});
export const ProductPriceSchema = new mongoose.Schema({
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
})

export const ProfitSchema = new mongoose.Schema({
    profit: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
})
