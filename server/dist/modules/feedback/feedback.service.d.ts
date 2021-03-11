import { Connection, Model } from 'mongoose';
import { Feedback } from './interface/feedback.interface';
import { FeedbackCredentialsDto } from './dto/feedback.credentials.dto';
import { Product } from '../product/interface/product.interface';
import { Account } from '../auth/interface/auth.interface';
export declare class FeedbackService {
    private feedbackModel;
    private productModel;
    private accountModel;
    private connection;
    constructor(feedbackModel: Model<Feedback>, productModel: Model<Product>, accountModel: Model<Account>, connection: Connection);
    getAll(query: any): Promise<any>;
    create(idUser: string, feedbackCredentialsDto: FeedbackCredentialsDto): Promise<Feedback>;
}
