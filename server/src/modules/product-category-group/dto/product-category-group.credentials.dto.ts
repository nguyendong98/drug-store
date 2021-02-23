import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ProductCategoryGroupCredentialsDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;
}
