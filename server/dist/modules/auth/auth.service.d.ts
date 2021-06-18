import { Connection, Model } from 'mongoose';
import { Account, AccountResponse, Role, SocialAccount } from './interface/auth.interface';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private accountModel;
    private roleModel;
    private connection;
    private jwtService;
    constructor(accountModel: Model<Account>, roleModel: Model<Role>, connection: Connection, jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<Account>;
    signUpStaff(authCredentialsDto: AuthCredentialsDto): Promise<Account>;
    signIn(account: Account): Promise<{
        accessToken: string;
    }>;
    validateUser(username: string, pass: string): Promise<Account>;
    loginSocial(payload: SocialAccount): Promise<{
        accessToken: string;
    }>;
    getMe(req: any): Promise<Account>;
    updateUserAvatar(id: string, fileName: string): Promise<AccountResponse>;
    getAll(query: any): Promise<any>;
}
