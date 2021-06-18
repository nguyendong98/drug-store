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
exports.AuthController = exports.storage = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_credentials_dto_1 = require("./dto/auth.credentials.dto");
const swagger_1 = require("@nestjs/swagger");
const local_auth_guard_1 = require("./guards/local-auth.guard");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const login_credentials_dto_1 = require("./dto/login.credentials.dto");
const roles_guard_1 = require("./guards/roles.guard");
const roles_decorator_1 = require("./decorators/roles.decorator");
const api_implicit_param_decorator_1 = require("@nestjs/swagger/dist/decorators/api-implicit-param.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path = require("path");
const uuid_1 = require("uuid");
exports.storage = {
    storage: multer_1.diskStorage({
        destination: './uploads/profiles',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuid_1.v4();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        }
    })
};
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(res, authCredentialsDto) {
        const account = await this.authService.signUp(authCredentialsDto);
        return res.status(common_1.HttpStatus.OK).json({
            message: "account created successfully",
            account: account
        });
    }
    async createStaff(res, authCredentialsDto) {
        const account = await this.authService.signUpStaff(authCredentialsDto);
        return res.status(common_1.HttpStatus.OK).json({
            message: "account created successfully",
            account: account
        });
    }
    async signIn(loginDto, req) {
        return this.authService.signIn(req.user);
    }
    async loginSocial(loginDto, req) {
        return this.authService.loginSocial(req.user);
    }
    getMe(req) {
        return this.authService.getMe(req.user);
    }
    getAllAccount(query) {
        return this.authService.getAll(query);
    }
    async uploadedFile(file, req) {
        return this.authService.updateUserAvatar(req.user._id, file.filename);
    }
    async serveAvatar(fileId, res) {
        res.sendFile(fileId, { root: 'uploads/profiles' });
    }
};
__decorate([
    common_1.Post('account/sign-up'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_credentials_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    roles_decorator_1.hasRoles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Post('account/staff'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_credentials_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createStaff", null);
__decorate([
    common_1.UseGuards(local_auth_guard_1.LocalAuthGuard),
    common_1.Post('account/sign-in'),
    __param(0, common_1.Body(common_1.ValidationPipe)), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_credentials_dto_1.LoginCredentialsDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    common_1.Post('account/sign-in/social'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('account/sign-in'),
    __param(0, common_1.Body(common_1.ValidationPipe)), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_credentials_dto_1.LoginCredentialsDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginSocial", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('me'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getMe", null);
__decorate([
    roles_decorator_1.hasRoles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Get('/account'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAllAccount", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    api_implicit_param_decorator_1.ApiImplicitParam({ name: 'id', description: 'user id', required: true, type: String }),
    common_1.Put('/avatar'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('avatar', exports.storage)),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadedFile", null);
__decorate([
    common_1.Get('avatar/:fileId'),
    __param(0, common_1.Param('fileId')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "serveAvatar", null);
AuthController = __decorate([
    swagger_1.ApiTags('Auth'),
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map