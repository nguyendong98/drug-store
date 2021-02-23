import { Module } from '@nestjs/common';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductSchema} from '../product/product.schema';
import {ReceiptDetailSchema, ReceiptSchema, WarehouseSchema} from './receipt.schema';
import {AccountSchema, RoleSchema} from '../auth/auth.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'product', schema: ProductSchema},
      { name: 'receipt', schema: ReceiptSchema},
      { name: 'receipt-detail', schema: ReceiptDetailSchema},
      { name: 'warehouse', schema: WarehouseSchema},
      { name: 'account', schema: AccountSchema},
      { name: 'role', schema: RoleSchema},
    ]),
  ],
  controllers: [ReceiptController],
  providers: [ReceiptService],
  exports: [ReceiptService]
})
export class ReceiptModule {}
