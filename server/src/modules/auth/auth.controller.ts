import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Res,
    Request,
    UseGuards,
    ValidationPipe,
    Get,
    Put,
    UseInterceptors, UploadedFile, Param, Req, Query
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {JwtAuthGuard} from './guards/jwt-auth.guard';
import {LoginCredentialsDto} from './dto/login.credentials.dto';
import {RolesGuard} from './guards/roles.guard';
import {hasRoles} from './decorators/roles.decorator';
import {ApiImplicitParam} from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import {FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuid4 } from 'uuid';
import {LoginSocialCredentialsDto} from './dto/login-social.credentials.dto';
export const storage = {
    storage: diskStorage({
        destination: './uploads/profiles',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuid4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })

}
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('account/sign-up')
    async signUp(
        @Res() res,
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ) {
        const account = await this.authService.signUp(authCredentialsDto);
        return res.status(HttpStatus.OK).json({
            message: "account created successfully",
            account: account
        })
    }

    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('account/staff')
    async createStaff(
        @Res() res,
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ) {
        const account = await this.authService.signUpStaff(authCredentialsDto);
        return res.status(HttpStatus.OK).json({
            message: "account created successfully",
            account: account
        })
    }
    @UseGuards(LocalAuthGuard)
    @Post('account/sign-in')
    async signIn(@Body (ValidationPipe) loginCredentialsDto: LoginCredentialsDto, @Request() req) {
        return this.authService.signIn(req.user);
    }

    @Post('account/sign-in/social')
    async loginSocial(@Body (ValidationPipe) loginSocialCredentialsDto: LoginSocialCredentialsDto) {
        return this.authService.loginSocial(loginSocialCredentialsDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Request() req) {
        return this.authService.getMe(req.user);
    }

    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/account')
    @ApiBearerAuth()
    getAllAccount(@Query() query: {
        idRole?: string,
        pageNumber?: number,
        pageSize?: number
    }): Promise<any> {
        return this.authService.getAll(query);
    }

    @UseGuards(JwtAuthGuard)
    @ApiImplicitParam({name: 'id', description: 'user id', required: true, type: String})
    @Put('/avatar')
    @UseInterceptors(
        FileInterceptor('avatar', storage),
    )
    async uploadedFile(@UploadedFile() file, @Request() req) {
        return this.authService.updateUserAvatar(req.user._id, file.filename);
    }

    @Get('avatar/:fileId')
    async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
        res.sendFile(fileId, { root: 'uploads/profiles' });
    }
}
