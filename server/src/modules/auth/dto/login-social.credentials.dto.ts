import { IsString } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class LoginSocialCredentialsDto {

    username: string

    // @IsString()
    fullName: string
    // @IsString()
    avatar?: string

    // @IsString()
    email?: string


}
