import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUser(res: any): Promise<any>;
    addUser(res: any, CreateUserDto: CreateUserDto): Promise<any>;
    getUserDetail(res: any, userId: any): Promise<any>;
}
