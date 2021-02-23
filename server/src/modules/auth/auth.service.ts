import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from '@nestjs/mongoose';
import {Connection, Model} from 'mongoose';
import {Account, AccountResponse, Role} from './interface/auth.interface';
import {AuthCredentialsDto} from './dto/auth.credentials.dto';
import * as bcrypt from 'bcrypt';
import * as gravatar from 'gravatar';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel('account') private accountModel: Model<Account>,
        @InjectModel('role') private roleModel: Model<Role>,
        @InjectConnection() private connection: Connection,
        private jwtService: JwtService
    ) {}

    // @route    POST auth/account/sign-up
    // @desc     register account
    // @access   public
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<Account> {
        const {fullName, username, password, email, phone} = authCredentialsDto;

        const hashedPassword = await bcrypt.hash(password, 10);
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        });
        const roleId = await this.roleModel.findOne({description: 'customer'});
        if (!roleId) {
            throw new NotFoundException('Not found!')
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
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User already exists');
            }
            throw error;
        }
    }

    // @route    POST auth/account/staff
    // @desc     register account
    // @access   private (admin tạo tài khoản cấp cho nhân viên)
    async signUpStaff(authCredentialsDto: AuthCredentialsDto): Promise<Account> {
        const {fullName, username, password, email, phone} = authCredentialsDto;

        const hashedPassword = await bcrypt.hash(password, 10);
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        });
        const roleId = await this.roleModel.findOne({description: 'staff'});
        if (!roleId) {
            throw new NotFoundException('Not found!')
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
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User already exists');
            }
            throw error;
        }
    }
    // @route    POST auth/account/sign-in
    // @desc     sign-in
    // @access   public
    async signIn(account: Account) {
        const payload = { username: account.username, sub: account._id, roleId: account.roleId };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async validateUser(username: string, pass: string): Promise<Account> {
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
    // @route    GET auth/me
    // @desc     get profile
    // @access   private
    async getMe(req): Promise<Account> {
        try {
            const res = await this.accountModel.findById(req._id)
                                .select('-password')
                                .populate({path: 'roleId'});
            return res;
        } catch (error) {
            throw error;
        }
    }

    // @route    PUT avatar for user
    // @desc     get all product
    // @access   public
    async updateUserAvatar(id: string, fileName: string): Promise<AccountResponse> {
        try {
            const res = await this.accountModel.findByIdAndUpdate(id, {
                avatar: fileName
            }, {
                new: true,
                upsert: false,
                runValidators: true
            });
            return { effectArrows: 1 };
        } catch (error) {
            throw error;
        }
    }

    // @route    GET list account
    // @desc     get all account
    // @access   private (admin)
    async getAll(query): Promise<any> {
        if (!query.idRole) {
            const totalElement = await this.accountModel.countDocuments();
            try {
                const result = await this.accountModel.find()
                    .skip((Number(query.pageNumber) * Number(query.pageSize)) - Number(query.pageSize))
                    .limit(Number(query.pageSize))
                    .populate({path: 'roleId'})
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
                return this.accountModel.find();
            }
        }
        if (!query.pageSize) {
            query.pageSize = 16;
        }
        if (!query.pageNumber) {
            query.pageNumber = 1;
        }
        const totalElement = await this.accountModel.countDocuments({idRole: query.idRole});

        try {
            const result = await this.accountModel.find({roleId: query.idRole})
                .skip((Number(query.pageNumber) * Number(query.pageSize)) - Number(query.pageSize))
                .limit(Number(query.pageSize))
                .populate({path: 'roleId'})
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
            return this.accountModel.find();
        }
    }
}
