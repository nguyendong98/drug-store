import { User, UserDocument } from './user.schema';
import { Connection, Model } from 'mongoose';
import { CreateUserDto } from './dto/createUserDto';
export declare class UserService {
    private userModel;
    private connection;
    constructor(userModel: Model<UserDocument>, connection: Connection);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    getUserById(userId: any): Promise<User>;
}
