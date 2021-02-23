import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class FeedbackCredentialsDto {

    @IsNotEmpty()
    @ApiProperty()
    idProduct: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    comment: string;

    @ApiProperty()
    star: number;


}
