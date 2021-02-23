import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from '@nestjs/mongoose';
import {Connection, Model} from 'mongoose';
import {Feedback} from './interface/feedback.interface';
import {FeedbackCredentialsDto} from './dto/feedback.credentials.dto';
import {Product} from '../product/interface/product.interface';
import {Account} from '../auth/interface/auth.interface';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectModel('feedback') private feedbackModel: Model<Feedback>,
        @InjectModel('product') private productModel: Model<Product>,
        @InjectModel('account') private accountModel: Model<Account>,
        @InjectConnection() private connection: Connection,
    ) {}
    // @route    GET feedback
    // @desc     get all feedback
    // @access   public
    async getAll(query): Promise<any> {
        if (!query.product) {
            const totalElement = await this.feedbackModel.countDocuments();
            if (!query.pageSize) {
                query.pageSize = 5;
            }
            if (!query.pageNumber) {
                query.pageNumber = 1;
            }
            try {
                const result = await this.feedbackModel.find()
                    .populate({path: 'idAccount'})
                    .skip((Number(query.pageNumber) * Number(query.pageSize)) - Number(query.pageSize))
                    .limit(Number(query.pageSize))
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
                throw e;
            }
        }
        else if (query.product) {
            const totalElement = await this.feedbackModel.countDocuments({idProduct: query.product});
            if (!query.pageSize) {
                query.pageSize = 5;
            }
            if (!query.pageNumber) {
                query.pageNumber = 1;
            }
            try {
                const result = await this.feedbackModel.find({idProduct: query.product})
                    .populate({path: 'idAccount'})
                    .skip((Number(query.pageNumber) * Number(query.pageSize)) - Number(query.pageSize))
                    .limit(Number(query.pageSize))
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
                return this.feedbackModel.find();
            }
        } else {

        }

    }

    // @route    post feedback
    // @desc     get all feedback
    // @access   public
    async create(idUser: string, feedbackCredentialsDto: FeedbackCredentialsDto): Promise<Feedback> {
        const {
            idProduct,
            comment,
            star
        } = feedbackCredentialsDto;
        const user = await this.accountModel.findById(idUser);
        const product = await this.productModel.findById(idProduct);
        if (!product || !user) {
            throw new NotFoundException('Not found');
        }
        const feedback = new this.feedbackModel({
            idAccount: user,
            idProduct: product,
            comment,
            star
        });
        try {
            await feedback.save();
            return feedback;
        } catch (e) {
            throw e;
        }
    }

}
