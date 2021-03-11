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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
const mongoose_2 = require("mongoose");
const createUserDto_1 = require("./dto/createUserDto");
let UserService = class UserService {
    constructor(userModel, connection) {
        this.userModel = userModel;
        this.connection = connection;
    }
    async create(createUserDto) {
        const user = await new this.userModel(createUserDto);
        await user.save();
        return user;
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async getUserById(userId) {
        const user = await this.userModel
            .findById(userId)
            .exec();
        return user;
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUserDto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "create", null);
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __param(1, mongoose_1.InjectConnection()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Connection])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map