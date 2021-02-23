import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ProductCategoryGroupModule } from './modules/product-category-group/product-category-group.module';
import {ProductCategoryModule} from './modules/product-category/product-category.module';
import {ProductModule} from './modules/product/product.module';
import {MulterModule} from '@nestjs/platform-express';
import { FeedbackModule } from './modules/feedback/feedback.module';
import {OrderModule} from './modules/order/order.module';
import {MailerModule} from '@nestjs-modules/mailer';
import {SendGridModule} from '@anchan828/nest-sendgrid';
import { ReceiptModule } from './modules/receipt/receipt.module';
import { StatisticalModule } from './modules/statistical/statistical.module';
import { TimeKeepingModule } from './modules/time-keeping/time-keeping.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false
    // }),
    MongooseModule.forRoot(process.env.MONGO_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }),
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY
    }),
    AuthModule,
    ProductCategoryGroupModule,
    ProductCategoryModule,
    ProductModule,
    FeedbackModule,
    OrderModule,
    ReceiptModule,
    StatisticalModule,
    TimeKeepingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
