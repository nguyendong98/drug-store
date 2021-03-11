import { CreateUserDto } from './dto/createUserDto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    addUser(res: any, CreateUserDto: CreateUserDto): Promise<any>;
}
