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
exports.ReceiptService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ReceiptService = class ReceiptService {
    constructor(productModel, accountModel, receiptModel, receiptDetailModel, warehouseModel) {
        this.productModel = productModel;
        this.accountModel = accountModel;
        this.receiptModel = receiptModel;
        this.receiptDetailModel = receiptDetailModel;
        this.warehouseModel = warehouseModel;
    }
    async createReceipt(id, data) {
        const { item, expiryDate } = data;
        const creator = await this.accountModel.findById(id).select('_id');
        if (!creator) {
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
                    qty: value.qty
                });
                totalAmount += product.idPrice.price * Number(value.qty);
                const warehouseItem = new this.warehouseModel({
                    idProduct: product._id,
                    qty: value.qty,
                    expiryDate
                });
                await warehouseItem.save();
            }
        }
        const receipt = new this.receiptModel({
            creator,
            totalAmount,
        });
        try {
            if (receipt && receipt._id) {
                const receiptDetail = new this.receiptDetailModel({
                    idReceipt: receipt._id,
                    bill: billDetail
                });
                await receiptDetail.save();
            }
            await receipt.save();
            return receipt;
        }
        catch (e) {
            throw e;
        }
    }
    async getWarehouse(query) {
        try {
            if (query && query.idProduct) {
                const res = await this.warehouseModel.find({ idProduct: query.idProduct }).populate({ path: 'idProduct' });
                return res;
            }
            else {
                const res = await this.warehouseModel.find().populate({ path: 'idProduct' });
                return res;
            }
        }
        catch (e) {
            throw e;
        }
    }
};
ReceiptService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('product')),
    __param(1, mongoose_1.InjectModel('account')),
    __param(2, mongoose_1.InjectModel('receipt')),
    __param(3, mongoose_1.InjectModel('receipt-detail')),
    __param(4, mongoose_1.InjectModel('warehouse')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ReceiptService);
exports.ReceiptService = ReceiptService;
//# sourceMappingURL=receipt.service.js.map