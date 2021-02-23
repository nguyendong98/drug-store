import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {StatisticalService} from './statistical.service';
import {hasRoles} from '../auth/decorators/roles.decorator';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {RolesGuard} from '../auth/guards/roles.guard';

@Controller('statistical')
export class StatisticalController {
    constructor(
        private statisticalService: StatisticalService
    ) {}

    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/revenue')
    getRevenue(@Query() query?: {
        year: number
    }): Promise<any> {
        return this.statisticalService.getRevenue(query);
    }

    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/revenue/date')
    getRevenueByDate(@Query() query?: {
        from: any,
        to: any
    }): Promise<any> {
        return this.statisticalService.getRevenueByDate(query);
    }

    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/user')
    getUserByMonth(@Query() query?: {
        month: number,
        year: number
    }): Promise<any> {
        return this.statisticalService.getUserByMonth(query);
    }
}
