import { Module } from '@nestjs/common';
import { TimeKeepingController } from './time-keeping.controller';
import { TimeKeepingService } from './time-keeping.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {SalarySchema, TimeKeepingSchema, WorkShiftSchema} from './time-keeping.schema';
import {AccountSchema, RoleSchema} from '../auth/auth.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'work-shift', schema: WorkShiftSchema},
      { name: 'role', schema: RoleSchema},
      { name: 'account', schema: AccountSchema},
      { name: 'time-keeping', schema: TimeKeepingSchema},
      { name: 'salary', schema: SalarySchema}
    ]),
  ],
  controllers: [TimeKeepingController],
  providers: [TimeKeepingService],
  exports: [TimeKeepingService]
})
export class TimeKeepingModule {}
