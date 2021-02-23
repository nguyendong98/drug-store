import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
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
export const orderDetailSchema = new mongoose.Schema({
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
})
