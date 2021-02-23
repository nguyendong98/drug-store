import {Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards} from '@nestjs/common';
import {TimeKeepingService} from './time-keeping.service';
import {hasRoles} from '../auth/decorators/roles.decorator';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {RolesGuard} from '../auth/guards/roles.guard';

@Controller('time-keeping')
export class TimeKeepingController {
    constructor(
        private timeKeepingService: TimeKeepingService
    ) {}


    @hasRoles('admin', 'staff')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/work-shift')
    getAllWorkShift() {
        return this.timeKeepingService.getAllWorkShift();
    }

    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/work-shift')
    createWorkShift(
        @Body() data: any
    ) {
        return this.timeKeepingService.createWorkShift(data);
    }

    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/work-shift/:workShiftId')
    deleteWorkShift(
        @Param('workShiftId') id
    ) {
        return this.timeKeepingService.deleteWorkShift(id);
    }



    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/calendar')
    createCalendar(
        @Body() data: any
    ) {
        return this.timeKeepingService.createCalendar(data)
    }

    @hasRoles('admin', 'staff')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/calendar')
    getAllCalendar(@Query() query?: {
        date: any,
        weekFromDate: any,
        weekToDate: any
    }) {
        return this.timeKeepingService.getAllCalendar(query);
    }

    @hasRoles('admin', 'staff')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/calendar/confirm')
    confirmCalendar(@Body() data: {
        idStaff: string,
        idWorkShift: string,
        date: any

    }) {
        return this.timeKeepingService.confirmCalendar(data);
    }



    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/salary')
    createSalary(@Body() data: {
        valueOfHour: number
    }) {
        return this.timeKeepingService.createSalary(data);
    }

    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/salary/:salaryId')
    updateSalary(@Param('salaryId') id,
       @Body() data: {
        valueOfHour: number
    }) {
        return this.timeKeepingService.updateSalary(id ,data);
    }

    @hasRoles('admin', 'staff')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/calendar/:staffId')
    getCalendarOfStaff(
        @Param('staffId') id
    ) {
        return this.timeKeepingService.getCalendarOfStaff(id);
    }

    @Get('/salary')
    getSalary() {
        return this.timeKeepingService.getSalary();
    }
}
