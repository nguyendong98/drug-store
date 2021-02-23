import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ProductCategoryCredentialsDto {

    @IsNotEmpty()
    @ApiProperty()
    idGroup: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;



}
