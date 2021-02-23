import * as mongoose from 'mongoose';

export const ReceiptSchema = new mongoose.Schema({

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

export const ReceiptDetailSchema = new mongoose.Schema({
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

})
export const WarehouseSchema = new mongoose.Schema({
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    qty: Number,
    expiryDate: Date
})

