"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OrderService = class OrderService {
    constructor(productModel, accountModel, orderModel, orderDetailModel, warehouseModel) {
        this.productModel = productModel;
        this.accountModel = accountModel;
        this.orderModel = orderModel;
        this.orderDetailModel = orderDetailModel;
        this.warehouseModel = warehouseModel;
    }
    async getAll(query) {
        if (!query.pageSize) {
            query.pageSize = 16;
        }
        if (!query.pageNumber) {
            query.pageNumber = 1;
        }
        const totalElement = await this.orderModel.countDocuments();
        try {
            const result = await this.orderModel.find()
                .skip((Number(query.pageNumber) * Number(query.pageSize)) - Number(query.pageSize))
                .limit(Number(query.pageSize))
                .populate({
                path: 'idOrderDetail'
            })
                .sort({ createAt: 'desc' })
                .exec();
            return {
                result,
                pageNumber: Number(query.pageNumber),
                pageSize: Number(query.pageSize),
                total: result.length,
                totalElement,
                totalPage: Math.ceil(totalElement / Number(query.pageSize))
            };
        }
        catch (e) {
            return this.orderModel.find();
        }
    }
    async create(idUser, data) {
        const { bill, customerName, phone, email, address, note, totalAmount, paymentType, payerInfo } = data;
        const customer = await this.accountModel.findById(idUser).select('_id');
        if (!customer) {
            throw new common_1.NotFoundException('Not found');
        }
        let billDetail = [];
        if (bill && bill.length > 0) {
            for (const item of bill) {
                const product = await this.productModel.findById(item.product).select('_id');
                billDetail.push({
                    product,
                    price: item.price,
                    name: item.name,
                    qty: item.qty
                });
            }
        }
        ;
        const order = new this.orderModel({
            customer,
            staff: null,
            totalAmount,
            paymentType,
            orderStatus: 'waitingApproved'
        });
        try {
            if (order && order._id) {
                const orderDetail = new this.orderDetailModel({
                    idOrder: order,
                    customerName,
                    phone,
                    email,
                    note,
                    address,
                    bill: billDetail,
                    payerInfo: payerInfo ? payerInfo : null
                });
                await orderDetail.save();
                order.idOrderDetail = orderDetail._id;
                await order.save();
            }
            await order.save();
            return order;
        }
        catch (e) {
            throw e;
        }
    }
    async approveOrder(id, data) {
        try {
            const dateNow = new Date().toISOString();
            for (const item of data) {
                const order = await this.orderModel.findById(item.id);
                if (order.orderStatus.toString().indexOf('waitingApproved') !== -1) {
                    await this.orderModel.findByIdAndUpdate(item.id, {
                        orderStatus: 'approved',
                        staff: id
                    }, {
                        new: true,
                        upsert: false,
                        runValidators: true
                    });
                }
                const orderDetail = await this.orderDetailModel.findOne({ idOrder: item.id });
                for (const value of orderDetail.bill) {
                    const warehouse = await this.warehouseModel.find({ idProduct: value.product });
                    if (warehouse && warehouse.length > 0) {
                        const warehouseInvalid = warehouse.filter(val => val.qty > 0 && val.expiryDate.toISOString() >= dateNow);
                        if (warehouseInvalid && warehouseInvalid.length > 0) {
                            let warehouseUpdate = await this.warehouseModel
                                .findOne({ $and: [{ idProduct: warehouseInvalid[0].idProduct }, { expiryDate: warehouseInvalid[0].expiryDate }] });
                            warehouseUpdate.qty -= value.qty;
                            await warehouseUpdate.save();
                        }
                    }
                }
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getDetail(id) {
        try {
            const res = await this.orderModel.findById(id).populate({ path: 'idOrderDetail' }).populate({ path: 'customer' });
            return res;
        }
        catch (e) {
            throw e;
        }
    }
    async createOrderNow(id, data) {
        const { item, customerName, phone } = data;
        const staff = await this.accountModel.findById(id).select('_id');
        if (!staff) {
            throw new common_1.NotFoundException('Not found');
        }
        let billDetail = [];
        let totalAmount = 0;
        if (item) {
            for (const value of item) {
                const product = await this.productModel.findOne({ name: value.product })
                    .populate({ path: 'idPrice' });
                billDetail.push({
                    product: product._id,
                    price: product.idPrice.price,
                    name: product.name,
                    qty: value.qty
                });
                totalAmount += product.idPrice.price * Number(value.qty);
            }
        }
        const order = new this.orderModel({
            customer: null,
            staff,
            totalAmount,
            paymentType: 'at-store',
            orderStatus: 'approved'
        });
        try {
            if (order && order._id) {
                const orderDetail = new this.orderDetailModel({
                    idOrder: order,
                    customerName,
                    phone,
                    email: null,
                    note: null,
                    address: null,
                    bill: billDetail,
                    payerInfo: null
                });
                await orderDetail.save();
                order.idOrderDetail = orderDetail._id;
                await order.save();
            }
            await order.save();
            return order;
        }
        catch (e) {
            throw e;
        }
    }
};
OrderService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('product')),
    __param(1, mongoose_1.InjectModel('account')),
    __param(2, mongoose_1.InjectModel('order')),
    __param(3, mongoose_1.InjectModel('order-detail')),
    __param(4, mongoose_1.InjectModel('warehouse')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map