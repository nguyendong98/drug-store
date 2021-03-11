import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { LoginCredentialsDto } from './dto/login.credentials.dto';
export declare const storage: {
    storage: any;
};
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(res: any, authCredentialsDto: AuthCredentialsDto): Promise<any>;
    createStaff(res: any, authCredentialsDto: AuthCredentialsDto): Promise<any>;
    signIn(loginDto: LoginCredentialsDto, req: any): Promise<{
        accessToken: string;
    }>;
    getMe(req: any): Promise<import("./interface/auth.interface").Account>;
    getAllAccount(query: {
        idRole?: string;
        pageNumber?: number;
        pageSize?: number;
    }): Promise<any>;
    uploadedFile(file: any, req: any): Promise<import("./interface/auth.interface").AccountResponse>;
    serveAvatar(fileId: any, res: any): Promise<any>;
}
