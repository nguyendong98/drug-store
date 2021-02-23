import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductCategorySchema} from '../product-category/product-category.schema';
import {
  TradeMarkSchema,
  ProducerSchema,
  ProductSchema,
  UnitSchema,
  ProductPriceSchema,
  ProfitSchema
} from './product.schema';
import {ProductCategoryGroupSchema} from '../product-category-group/product-category-group.schema';
import {RoleSchema} from '../auth/auth.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'product', schema: ProductSchema},
      { name: 'product-category', schema: ProductCategorySchema },
      { name: 'product-category-group', schema: ProductCategoryGroupSchema },
      { name: 'trade-mark', schema: TradeMarkSchema},
      { name: 'producer', schema: ProducerSchema},
      { name: 'unit', schema: UnitSchema },
      { name: 'product-price', schema: ProductPriceSchema},
      { name: 'profit', schema: ProfitSchema},
      { name: 'role', schema: RoleSchema}
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
