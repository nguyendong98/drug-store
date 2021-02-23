import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductSchema} from '../product/product.schema';
import {AccountSchema} from '../auth/auth.schema';
import {FeedbackSchema} from './feedback.schema';
import {FeedbackService} from './feedback.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'product', schema: ProductSchema},
      { name: 'account', schema: AccountSchema },
      { name: 'feedback', schema: FeedbackSchema },

    ]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: [FeedbackService]
})
export class FeedbackModule {}
