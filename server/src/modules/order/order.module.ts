import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductSchema} from '../product/product.schema';
import {AccountSchema, RoleSchema} from '../auth/auth.schema';
import {orderDetailSchema, OrderSchema} from './order.schema';
import {WarehouseSchema} from '../receipt/receipt.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'product', schema: ProductSchema},
      { name: 'account', schema: AccountSchema},
      { name: 'order', schema: OrderSchema},
      { name: 'role', schema: RoleSchema},
      { name: 'order-detail', schema: orderDetailSchema},
      { name: 'warehouse', schema: WarehouseSchema}
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
