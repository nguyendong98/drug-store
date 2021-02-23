import {
    Body,
    Controller,
    Get, Param,
    Post, Put, Query,
    ValidationPipe
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ProductCategoryService} from './product-category.service';
import {ProductCategoryCredentialsDto} from './dto/product-category.credentials.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {RolesGuard} from '../auth/guards/roles.guard';
import {hasRoles} from '../auth/decorators/roles.decorator';
import {ApiImplicitQuery} from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import {ApiImplicitParam} from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';


@ApiTags('Category')
@Controller('product')
export class ProductCategoryController {
    constructor(private productCategoryService: ProductCategoryService) {}


    @ApiImplicitQuery({name: 'group-id',  type: String})
    @Get('/category')
    getAll(@Query() query?: {keyword?: string, 'group-id'?: string }) {
        return this.productCategoryService.getAll(query);
    }

    @ApiImplicitParam({name: 'id', description: 'product id', required: true, type: String})
    @Get('/category/:id')
    getById(@Param('id') _id: string ) {
        return this.productCategoryService.getCategoryDetail(_id);
    }



    // @hasRoles('admin')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/category')
    create(
        @Body(ValidationPipe) productCategoryCredentialsDto: ProductCategoryCredentialsDto
    )  {
        return this.productCategoryService.create(productCategoryCredentialsDto);
    }



}
