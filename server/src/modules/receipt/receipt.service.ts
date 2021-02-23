import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";
import {Product} from '../product/interface/product.interface';
import {Account} from '../auth/interface/auth.interface';

@Injectable()
export class ReceiptService {
    constructor(
        @InjectModel('product') private productModel: Model<Product>,
        @InjectModel('account') private accountModel: Model<Account>,
        @InjectModel('receipt') private receiptModel: Model<any>,
        @InjectModel('receipt-detail') private receiptDetailModel: Model<any>,
        @InjectModel('warehouse') private warehouseModel: Model<any>,
    ) {}

    // @route POST order
    // @desc tạo đơn hàng (chức năng của cms)
    // @access private
    async createReceipt(id: string, data: any): Promise<any> {
        const { item, expiryDate } = data;
        const creator = await this.accountModel.findById(id).select('_id');
        if (!creator) {
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
                    qty: value.qty
                })
                totalAmount += product.idPrice.price * Number(value.qty);
                const warehouseItem = new this.warehouseModel({
                    idProduct: product._id,
                    qty: value.qty,
                    expiryDate
                })
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
                })
                await receiptDetail.save();
            }
            await receipt.save();
            return receipt;

        } catch (e) {
            throw e;
        }
    }


    // @route GET warehouse
    // @desc lấy danh sách kho hàng (chức năng của cms)
    // @access private
    async getWarehouse(query: {idProduct?: string}): Promise<any> {
        try {
            if (query && query.idProduct) {
                const res = await this.warehouseModel.find({idProduct: query.idProduct}).populate({path: 'idProduct'});
                return res;
            } else {
                const res = await this.warehouseModel.find().populate({path: 'idProduct'});
                return res;
            }
        } catch (e) {
            throw e;
        }
    }

}
