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
exports.StatisticalService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const moment = require('moment');
let StatisticalService = class StatisticalService {
    constructor(orderModel, orderDetailModel, receiptModel, accountModel) {
        this.orderModel = orderModel;
        this.orderDetailModel = orderDetailModel;
        this.receiptModel = receiptModel;
        this.accountModel = accountModel;
    }
    async getRevenue(query) {
        const date = new Date();
        if (!query.year) {
            query.year = moment(date).format('YYYY');
        }
        let data = { year: Number(query.year), statistical: [], totalCapital: 0, totalRevenue: 0 };
        const order = await this.orderModel.find({ orderStatus: "approved" });
        const receipt = await this.receiptModel.find();
        for (let i = 1; i <= 12; i++) {
            let totalAmountOrderMonth = 0;
            let totalAmountReceiptMonth = 0;
            const orderMonth = order.filter(val => Number(moment(val.createAt).format('YYYY')) === Number(query.year) &&
                Number(moment(val.createAt).format('MM')) === i);
            if (orderMonth && orderMonth.length > 0) {
                for (const item of orderMonth) {
                    totalAmountOrderMonth += item.totalAmount;
                }
            }
            const receiptMonth = receipt.filter(val => Number(moment(val.createAt).format('YYYY')) === Number(query.year) &&
                Number(moment(val.createAt).format('MM')) === i);
            if (receiptMonth && receiptMonth.length > 0) {
                for (const item of receiptMonth) {
                    totalAmountReceiptMonth += item.totalAmount;
                }
            }
            data.totalRevenue += totalAmountOrderMonth;
            data.totalCapital += totalAmountReceiptMonth;
            data.statistical.push({
                label: i,
                revenue: totalAmountOrderMonth,
                capital: totalAmountReceiptMonth
            });
        }
        return data;
    }
    async getRevenueByDate(query) {
        let data = { statistical: [], totalCapital: 0, totalRevenue: 0 };
        query.from = new Date(query.from);
        query.to = new Date(query.to);
        const order = await this.orderModel.find({ orderStatus: "approved" });
        const receipt = await this.receiptModel.find();
        while (query.from <= query.to) {
            let totalRevenueDay = 0;
            let totalCapitalDay = 0;
            const orderDay = order.filter(val => moment(val.createAt).format('DD/MM/YYYY') === moment(query.from).format('DD/MM/YYYY'));
            if (orderDay && orderDay.length > 0) {
                for (const item of orderDay) {
                    totalRevenueDay += item.totalAmount;
                }
            }
            const receiptDay = receipt.filter(val => moment(val.createAt).format('DD/MM/YYYY') === moment(query.from).format('DD/MM/YYYY'));
            if (receiptDay && receiptDay.length > 0) {
                for (const item of receiptDay) {
                    totalCapitalDay += item.totalAmount;
                }
            }
            data.statistical.push({
                label: moment(query.from).format("DD/MM/YYYY"),
                revenue: totalRevenueDay,
                capital: totalCapitalDay
            });
            data.totalRevenue += totalRevenueDay;
            data.totalCapital += totalCapitalDay;
            query.from = new Date(query.from.setDate(query.from.getDate() + 1));
        }
        return data;
    }
    async getUserByMonth(query) {
        const { year, month } = query;
        try {
            const accountStaff = await this.accountModel.find({ roleId: '60352e5531071b084cbe4db8' }).populate({ path: 'roleId' });
            const accountCustomer = await this.accountModel.find({ roleId: '60352e3b31071b084cbe4db7' }).populate({ path: 'roleId' });
            const accountStaffFilter = accountStaff.filter(val => Number(moment(val.createAt).format('MM')) === Number(month) &&
                Number(moment(val.createAt).format(('YYYY'))) === Number(year));
            const accountCustomerFilter = accountCustomer.filter(val => Number(moment(val.createAt).format('MM')) === Number(month) &&
                Number(moment(val.createAt).format('YYYY')) === Number(year));
            return [accountStaffFilter.length, accountCustomerFilter.length];
        }
        catch (e) {
            throw e;
        }
    }
};
StatisticalService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('order')),
    __param(1, mongoose_1.InjectModel('order-detail')),
    __param(2, mongoose_1.InjectModel('receipt')),
    __param(3, mongoose_1.InjectModel('account')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], StatisticalService);
exports.StatisticalService = StatisticalService;
//# sourceMappingURL=statistical.service.js.map