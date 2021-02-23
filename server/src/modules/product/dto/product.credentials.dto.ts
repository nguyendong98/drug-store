import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ProductCredentialsDto {

    @IsNotEmpty()
    @ApiProperty()
    idCategory: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    sku: string;

    @ApiProperty()
    keyword: string;

    @ApiProperty()
    contraindicated: string;

    @ApiProperty()
    dative: string;

    @ApiProperty()
    dosageAndUsage: string;

    @ApiProperty()
    preservation: string;

    @ApiProperty()
    ingredient: string;

    @ApiProperty()
    packing: string;

    @ApiProperty()
    idTradeMark: string;

    @ApiProperty()
    idProducer: string;

    @ApiProperty()
    idUnit: string;

    @ApiProperty()
    price: string

}
