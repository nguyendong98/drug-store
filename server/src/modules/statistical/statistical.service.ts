import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";
import {Order, OrderDetail} from '../order/interface/order.interface';
import {Account} from '../auth/interface/auth.interface';
const moment = require('moment');

@Injectable()
export class StatisticalService {
    constructor(
        @InjectModel('order') private orderModel: Model<Order>,
        @InjectModel('order-detail') private orderDetailModel: Model<OrderDetail>,
        @InjectModel('receipt') private receiptModel: Model<any>,
        @InjectModel('account') private accountModel: Model<Account>

        // @InjectModel('receipt')
    ) {}

    // @route GET revenue
    // @desc thống kê doanh thu (chức năng của cms)
    // @access private
    async getRevenue(query: {year: any}): Promise<any> {
        const date = new Date();
        if (!query.year) {
            query.year = moment(date).format('YYYY');
        }
        let data = {year: Number(query.year), statistical: [], totalCapital: 0, totalRevenue: 0}
        const order = await this.orderModel.find({orderStatus: "approved"});
        const receipt = await this.receiptModel.find();
        for (let i = 1; i <= 12; i++) {
            let totalAmountOrderMonth = 0;
            let totalAmountReceiptMonth = 0;
            const orderMonth = order.filter(val =>
                Number(moment(val.createAt).format('YYYY')) === Number(query.year) &&
                Number(moment(val.createAt).format('MM')) === i);
            if (orderMonth && orderMonth.length > 0) {
                for (const item of orderMonth) {
                    totalAmountOrderMonth += item.totalAmount;
                }
            }
            const receiptMonth = receipt.filter(val =>
                Number(moment(val.createAt).format('YYYY')) === Number(query.year) &&
                Number(moment(val.createAt).format('MM')) === i);
            if (receiptMonth && receiptMonth.length > 0) {
                for (const item of receiptMonth) {
                    totalAmountReceiptMonth += item.totalAmount;
                }
            }
            data.totalRevenue += totalAmountOrderMonth;
            data.totalCapital+= totalAmountReceiptMonth;
            data.statistical.push({
                label: i,
                revenue: totalAmountOrderMonth,
                capital: totalAmountReceiptMonth
            });

        }
        return data;
    }

    // @route GET revenue
    // @desc thống kê doanh thu theo ngày (chức năng của cms)
    // @access private
    async getRevenueByDate(query: {from: any, to: any}): Promise<any> {
        let data = {statistical: [], totalCapital: 0, totalRevenue: 0}
        query.from = new Date(query.from);
        query.to = new Date(query.to);
        const order = await this.orderModel.find({orderStatus: "approved"});
        const receipt = await this.receiptModel.find();
        while (query.from <= query.to) {
            let totalRevenueDay = 0;
            let totalCapitalDay = 0;
            const orderDay = order.filter(val =>
                moment(val.createAt).format('DD/MM/YYYY') === moment(query.from).format('DD/MM/YYYY')
            );
            if (orderDay && orderDay.length > 0) {
                for (const item of orderDay) {
                    totalRevenueDay += item.totalAmount;
                }
            }
            const receiptDay = receipt.filter(val =>
                moment(val.createAt).format('DD/MM/YYYY') === moment(query.from).format('DD/MM/YYYY')
            );
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


    async getUserByMonth(query: {
        month: any,
        year: any
    }): Promise<any> {
        const { year, month } = query;
        try {
            const accountStaff = await this.accountModel.find({roleId: '60352e5531071b084cbe4db8'}).populate({path: 'roleId'});
            const accountCustomer = await this.accountModel.find({roleId: '60352e3b31071b084cbe4db7'}).populate({path: 'roleId'});

            const accountStaffFilter = accountStaff.filter(val =>
                Number(moment(val.createAt).format('MM')) === Number(month) &&
                Number(moment(val.createAt).format(('YYYY'))) === Number(year)
            )
            const accountCustomerFilter = accountCustomer.filter(val =>
                Number(moment(val.createAt).format('MM')) === Number(month) &&
                Number(moment(val.createAt).format('YYYY')) === Number(year)
            )
            return [accountStaffFilter.length, accountCustomerFilter.length];


        } catch (e) {
            throw  e;
        }
    }



}
