import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class AuthCredentialsDto {
    @IsString()
    @ApiProperty()
    fullName: string;

    @IsString()
    @IsNotEmpty({message: 'Username can not empty'})
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty()
    username: string;

    @IsString()
    @IsNotEmpty({ message: 'Password can not empty'})
    @MinLength(8, { message: 'Password is too short (8 characters min)' })
    @MaxLength(20, { message: 'Password is too long (20 characters max)' })
    @ApiProperty()
    password: string;


    @IsEmail({}, { message: 'Invalid email' })
    @IsNotEmpty({ message: 'Email can not empty'})
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Phone can not empty'})
    @ApiProperty()
    phone: string;
}
