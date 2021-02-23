import { Module } from '@nestjs/common';
import { StatisticalController } from './statistical.controller';
import { StatisticalService } from './statistical.service';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {orderDetailSchema, OrderSchema} from '../order/order.schema';
import {AccountSchema, RoleSchema} from '../auth/auth.schema';
import {ReceiptSchema} from '../receipt/receipt.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'order', schema: OrderSchema},
      { name: 'order-detail', schema: orderDetailSchema},
      { name: 'role', schema: RoleSchema},
      { name: 'receipt', schema: ReceiptSchema},
      { name: 'account', schema: AccountSchema}
    ]),
  ],
  controllers: [StatisticalController],
  providers: [StatisticalService],
  exports: [StatisticalService]
})
export class StatisticalModule {}
