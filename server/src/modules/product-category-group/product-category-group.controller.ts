import {Body, Controller, Get, Post, Request, UseGuards, ValidationPipe} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ProductCategoryGroupService} from './product-category-group.service';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {ProductCategoryGroupCredentialsDto} from './dto/product-category-group.credentials.dto';
import {hasRoles} from '../auth/decorators/roles.decorator';
import {RolesGuard} from '../auth/guards/roles.guard';


@ApiTags('Category-group')
@Controller('product')
export class ProductCategoryGroupController {
    constructor(private productCategoryGroupService: ProductCategoryGroupService) {}

    @Get('/category-group')
    getAll(@Request() req) {
        return this.productCategoryGroupService.getAll();
    }

    // @hasRoles('admin')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/category-group')
    create(
        @Body(ValidationPipe) productCategoryGroupCredentialsDto: ProductCategoryGroupCredentialsDto
    )  {
        return this.productCategoryGroupService.create(productCategoryGroupCredentialsDto);

    }

    @Get('/category-group/tree')
    getTree() {
        return this.productCategoryGroupService.getCategoryGroupTree();
    }
}
