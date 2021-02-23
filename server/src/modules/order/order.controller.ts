import {Body, Controller, Get, Param, Post, Put, Query, Request, UseGuards, ValidationPipe} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {OrderService} from './order.service';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {hasRoles} from '../auth/decorators/roles.decorator';
import {RolesGuard} from '../auth/guards/roles.guard';

@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(
       private orderService: OrderService,
    ) { }


    @Get('')
    getAll(@Query() query?: {
        pageNumber?: number,
        pageSize?: number
    }): Promise<any> {
        return this.orderService.getAll(query);
    }


    @UseGuards(JwtAuthGuard)
    @Post('')
    create(
        @Request() req,
        @Body() data: any
    ) {
        return this.orderService.create(req.user._id, data);
    }

    @hasRoles('admin', 'staff')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/approve')
    approveOrder(
        @Request() req,
        @Body() data: {id: string, orderStatus: string, email: string}[]
    ) {
        return this.orderService.approveOrder(req.user._id, data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getById(@Param('id') _id: string ) {
        return this.orderService.getDetail(_id);
    }

    @hasRoles('admin', 'staff')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/now')
    createNow(
        @Request() req,
        @Body() data: any
    ) {
        return this.orderService.createOrderNow(req.user._id, data);
    }
}
