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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(accountModel, roleModel, connection, jwtService) {
        this.accountModel = accountModel;
        this.roleModel = roleModel;
        this.connection = connection;
        this.jwtService = jwtService;
    }
    async signUp(authCredentialsDto) {
        const { fullName, username, password, email, phone } = authCredentialsDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        });
        const roleId = await this.roleModel.findOne({ description: 'customer' });
        if (!roleId) {
            throw new common_1.NotFoundException('Not found!');
        }
        const account = new this.accountModel({
            fullName,
            username,
            phone,
            password: hashedPassword,
            email,
            avatar,
            roleId
        });
        try {
            await account.save();
            return account;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('User already exists');
            }
            throw error;
        }
    }
    async signUpStaff(authCredentialsDto) {
        const { fullName, username, password, email, phone } = authCredentialsDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        });
        const roleId = await this.roleModel.findOne({ description: 'staff' });
        if (!roleId) {
            throw new common_1.NotFoundException('Not found!');
        }
        const account = new this.accountModel({
            fullName,
            username,
            password: hashedPassword,
            phone,
            email,
            avatar,
            roleId
        });
        try {
            await account.save();
            return account;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('User already exists');
            }
            throw error;
        }
    }
    async signIn(account) {
        const payload = { username: account.username, sub: account._id, roleId: account.roleId };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
    async loginSocial(payload) {
        console.log(payload);
        const { username, avatar, email, fullName } = payload;
        const user = await this.accountModel.findOne({ email });
        const roleId = await this.roleModel.findOne({ description: 'staff' });
        if (!user) {
            const newAccount = new this.accountModel({
                fullName,
                username,
                email,
                avatar,
                roleId
            });
            try {
                await newAccount.save();
                const payload = { username: newAccount.username, sub: newAccount._id, roleId: newAccount.roleId };
                return {
                    accessToken: this.jwtService.sign(payload),
                };
            }
            catch (e) {
                throw e;
            }
        }
        const p = { username: user.username, sub: user._id, roleId: user.roleId };
        return {
            accessToken: this.jwtService.sign(p),
        };
    }
    async validateUser(username, pass) {
        const user = await this.accountModel.findOne({ username });
        if (!user) {
            return null;
        }
        const valid = await bcrypt.compare(pass, user.password);
        if (valid) {
            return user;
        }
        return null;
    }
    async getMe(req) {
        try {
            const res = await this.accountModel.findById(req._id)
                .select('-password')
                .populate({ path: 'roleId' });
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async updateUserAvatar(id, fileName) {
        try {
            await this.accountModel.findByIdAndUpdate(id, {
                avatar: fileName
            }, {
                new: true,
                upsert: false,
                runValidators: true
            });
            return { effectArrows: 1 };
        }
        catch (error) {
            throw error;
        }
    }
    async getAll(query) {
        if (!query.idRole) {
            const totalElement = await this.accountModel.countDocuments();
            try {
                const result = await this.accountModel.find()
                    .skip((Number(query.pageNumber) * Number(query.pageSize)) - Number(query.pageSize))
                    .limit(Number(query.pageSize))
                    .populate({ path: 'roleId' })
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
                return this.accountModel.find();
            }
        }
        if (!query.pageSize) {
            query.pageSize = 16;
        }
        if (!query.pageNumber) {
            query.pageNumber = 1;
        }
        const totalElement = await this.accountModel.countDocuments({ idRole: query.idRole });
        try {
            const result = await this.accountModel.find({ roleId: query.idRole })
                .skip((Number(query.pageNumber) * Number(query.pageSize)) - Number(query.pageSize))
                .limit(Number(query.pageSize))
                .populate({ path: 'roleId' })
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
            return this.accountModel.find();
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('account')),
    __param(1, mongoose_1.InjectModel('role')),
    __param(2, mongoose_1.InjectConnection()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Connection,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map