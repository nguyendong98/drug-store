import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";
import {Product} from '../product/interface/product.interface';
import {Account} from '../auth/interface/auth.interface';
import {Order, OrderDetail} from './interface/order.interface';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('product') private productModel: Model<Product>,
        @InjectModel('account') private accountModel: Model<Account>,
        @InjectModel('order') private orderModel: Model<Order>,
        @InjectModel('order-detail') private orderDetailModel: Model<OrderDetail>,
        @InjectModel('warehouse') private warehouseModel: Model<any>,
    ) { }

    // @route    GET list order
    // @desc     get all order
    // @access   private (admin, staff)
    async getAll(query): Promise<any> {
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
                .sort({createAt: 'desc'})
                .exec();
            return {
                result,
                pageNumber: Number(query.pageNumber),
                pageSize: Number(query.pageSize),
                total: result.length,
                totalElement,
                totalPage: Math.ceil(totalElement/Number(query.pageSize))
            };
        } catch (e) {
            return this.orderModel.find();
        }
    }

    // @route    POST order
    // @desc     create order of customer
    // @access   public(customer)
    async create(idUser: string, data: any): Promise<Order> {
        const { bill, customerName, phone, email, address, note, totalAmount, paymentType, payerInfo} = data;
        const customer = await this.accountModel.findById(idUser).select('_id');
        if (!customer) {
            throw new NotFoundException('Not found');
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
                })
            }
        };
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
                })
                await orderDetail.save();
                order.idOrderDetail = orderDetail._id;
                await order.save();
            }
            await order.save();
            return order;
        } catch (e) {
            throw e;
        }
    }

    // @route    PUT order
    // @desc     duyệt đơn hàng
    // @access   private (admin, staff)
    async approveOrder(id: string, data: {id: string, email: string, orderStatus: string}[]): Promise<any> {
        try {
            const dateNow = new Date().toISOString();
            for (const item of data) {
                const order = await this.orderModel.findById(item.id);
                if (order.orderStatus.toString().indexOf('waitingApproved') !== -1 ) {
                    await this.orderModel.findByIdAndUpdate(item.id, {
                        orderStatus: 'approved',
                        staff: id
                    }, {
                        new: true,
                        upsert: false,
                        runValidators: true
                    });
                }
                const orderDetail = await this.orderDetailModel.findOne({idOrder: item.id});
                for (const value of orderDetail.bill) {
                    const warehouse = await this.warehouseModel.find({idProduct: value.product});
                    if (warehouse && warehouse.length > 0) {
                        const warehouseInvalid = warehouse.filter(val => val.qty > 0 && val.expiryDate.toISOString() >= dateNow);
                        if (warehouseInvalid && warehouseInvalid.length > 0) {
                            let warehouseUpdate = await this.warehouseModel
                                .findOne({$and: [{idProduct: warehouseInvalid[0].idProduct}, {expiryDate: warehouseInvalid[0].expiryDate}]});
                            warehouseUpdate.qty -= value.qty;
                            await warehouseUpdate.save();
                        }
                    }
                }
            }
        } catch (e) {
            throw e
        }
    }

    // @route    GET detail order
    // @desc     lấy chi tiết đơn hàng
    // @access   public
    async getDetail(id: string): Promise<Order> {
        try {
            const res = await this.orderModel.findById(id).populate({path: 'idOrderDetail'}).populate({path: 'customer'});
            return res;
        } catch (e) {
            throw e;
        }
    }

    // @route POST order
    // @desc tạo đơn hàng (chức năng của cms)
    // @access private
    async createOrderNow(id: string, data: any): Promise<any> {
        const { item, customerName, phone } = data;
        const staff = await this.accountModel.findById(id).select('_id');
        if (!staff) {
            throw new NotFoundException('Not found');
        }
        let billDetail = [];
        let totalAmount = 0;
        if (item) {
            for (const value of item) {
                const product = await this.productModel.findOne({name: value.product})
                    .populate({path: 'idPrice'});
                billDetail.push({
                    product: product._id,
                    price: product.idPrice.price,
                    name: product.name,
                    qty: value.qty
                })
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
                })
                await orderDetail.save();
                order.idOrderDetail = orderDetail._id;
                await order.save();
            }
            await order.save();
            return order;


        } catch (e) {
            throw e;
        }
    }



}
