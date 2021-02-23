import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ReceiptService} from './receipt.service';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {hasRoles} from '../auth/decorators/roles.decorator';
import {RolesGuard} from '../auth/guards/roles.guard';

@ApiTags('Receipt')
@Controller('receipt')
export class ReceiptController {
    constructor(
        private receiptService: ReceiptService
    ) {}

    @hasRoles('admin', 'staff')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('')
    create(
        @Request() req,
        @Body() data: any
    ) {
        return this.receiptService.createReceipt(req.user._id, data);
    }

    @Get('/warehouse')
    getWarehouse(
        query: {
            idProduct?: string
        }
    ) {
        return this.receiptService.getWarehouse(query);
    }
}
