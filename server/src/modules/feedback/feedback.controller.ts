import {Body, Controller, Get, Post, Query, Request, UseGuards, ValidationPipe} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {FeedbackService} from './feedback.service';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {ProductCredentialsDto} from '../product/dto/product.credentials.dto';
import {FeedbackCredentialsDto} from './dto/feedback.credentials.dto';


@ApiTags('Product')
@Controller('feedback')
export class FeedbackController {
    constructor(
        private feedbackService: FeedbackService
    ) {}

    @Get('')
    getAll(@Query() query?: {
        product?: string,
        pageNumber?: number,
        pageSize?: number
    }): Promise<any> {
        return this.feedbackService.getAll(query);
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    async createFeedback(
        @Request() req,
        @Body(ValidationPipe) feedbackCredentialsDto: FeedbackCredentialsDto
    ) {
        return this.feedbackService.create(req.user._id, feedbackCredentialsDto)
    }
}
