import { Module } from '@nestjs/common';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './product-category.service';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductCategorySchema} from './product-category.schema';
import {ProductCategoryGroupSchema} from '../product-category-group/product-category-group.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
        { name: 'product-category', schema: ProductCategorySchema },
        { name: 'product-category-groups', schema: ProductCategoryGroupSchema},
    ]),
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
  exports: [ProductCategoryService],
})
export class ProductCategoryModule {}
