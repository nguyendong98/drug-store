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
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FeedbackService = class FeedbackService {
    constructor(feedbackModel, productModel, accountModel, connection) {
        this.feedbackModel = feedbackModel;
        this.productModel = productModel;
        this.accountModel = accountModel;
        this.connection = connection;
    }
    async getAll(query) {
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
                    .populate({ path: 'idAccount' })
                    .skip((Number(query.pageNumber) * Number(query.pageSize)) - Number(query.pageSize))
                    .limit(Number(query.pageSize))
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
                throw e;
            }
        }
        else if (query.product) {
            const totalElement = await this.feedbackModel.countDocuments({ idProduct: query.product });
            if (!query.pageSize) {
                query.pageSize = 5;
            }
            if (!query.pageNumber) {
                query.pageNumber = 1;
            }
            try {
                const result = await this.feedbackModel.find({ idProduct: query.product })
                    .populate({ path: 'idAccount' })
                    .skip((Number(query.pageNumber) * Number(query.pageSize)) - Number(query.pageSize))
                    .limit(Number(query.pageSize))
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
                return this.feedbackModel.find();
            }
        }
        else {
        }
    }
    async create(idUser, feedbackCredentialsDto) {
        const { idProduct, comment, star } = feedbackCredentialsDto;
        const user = await this.accountModel.findById(idUser);
        const product = await this.productModel.findById(idProduct);
        if (!product || !user) {
            throw new common_1.NotFoundException('Not found');
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
        }
        catch (e) {
            throw e;
        }
    }
};
FeedbackService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('feedback')),
    __param(1, mongoose_1.InjectModel('product')),
    __param(2, mongoose_1.InjectModel('account')),
    __param(3, mongoose_1.InjectConnection()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Connection])
], FeedbackService);
exports.FeedbackService = FeedbackService;
//# sourceMappingURL=feedback.service.js.map