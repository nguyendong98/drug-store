import {
    Body,
    Controller,
    Get,
    Param,
    Post, Put, Query,
    Res,
    UploadedFile, UploadedFiles,
    UseGuards,
    UseInterceptors,
    ValidationPipe
} from '@nestjs/common';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuid4 } from 'uuid';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {ProductCredentialsDto} from './dto/product.credentials.dto';
import {ProductService} from './product.service';
import {ApiTags} from '@nestjs/swagger';
import {Product} from './interface/product.interface';
import {hasRoles} from '../auth/decorators/roles.decorator';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {RolesGuard} from '../auth/guards/roles.guard';
import {ApiImplicitParam} from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';



export const storage = {
    storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuid4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })

}
@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService
    ) {}

    @Get('')
    getAll(@Query() query?: {
        keyword?: string,
        category?: string,
        pageNumber?: number,
        pageSize?: number
    }): Promise<any> {
        return this.productService.getAll(query);
    }

    // @hasRoles('admin')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('')
    create(
        @Body(ValidationPipe) productCredentialsDto: ProductCredentialsDto
    ) {
        return this.productService.create(productCredentialsDto);
    }

    @ApiImplicitParam({name: 'id', description: 'product id', required: true, type: String})
    @Put('/image/:id')
    @UseInterceptors(
        FileInterceptor('image', storage),
    )
    async uploadedFile(@UploadedFile() file, @Param('id') _id: string ) {
        return this.productService.updateProductImage(_id, file.filename);
    }

    @Put('/price')
    async updatePrice(@Param('id') _id: string, @Body() price: number) {
        return this.productService.updateProductPrice(_id, price);
    }

    @Get('/image/:fileId')
    async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
        res.sendFile(fileId, { root: 'uploads/products' });
    }

    // @Put('/images')
    // @UseInterceptors(
    //     FilesInterceptor('image', storage),
    // )
    // async upload(@UploadedFiles() files) {
    //     console.log(files);
    // }
    @ApiImplicitParam({name: 'id', description: 'product id', required: true, type: String})
    @Get('/:id')
    getById(@Param('id') _id: string ) {
        return this.productService.getById(_id);
    }


    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/profit')
    createProfit(@Body() data: {
        profit: number
    }) {
        return this.productService.createProfit(data);
    }

    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/profit/:profitId')
    updateProfit(@Param('profitId') id,
                 @Body() data: {
                     profit: any
                 }) {
        return this.productService.updateProfit(id ,data);
    }

    @Get('/profit/list')
    getProfit() {
        return this.productService.getProfit();
    }


}


