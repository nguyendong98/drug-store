import { Module } from '@nestjs/common';
import { ProductCategoryGroupController } from './product-category-group.controller';
import { ProductCategoryGroupService } from './product-category-group.service';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductCategoryGroupSchema} from './product-category-group.schema';
import {RoleSchema} from '../auth/auth.schema';
import {ProductCategorySchema} from '../product-category/product-category.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
        { name: 'product-category-group', schema: ProductCategoryGroupSchema },
        { name: 'product-category', schema: ProductCategorySchema},
        { name: 'role', schema: RoleSchema }
    ]),
  ],
  controllers: [ProductCategoryGroupController],
  providers: [ProductCategoryGroupService],
  exports: [ProductCategoryGroupService]
})
export class ProductCategoryGroupModule {}
