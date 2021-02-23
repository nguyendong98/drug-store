import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import {AccountSchema, RoleSchema} from './auth.schema';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {LocalStrategy} from './strategies/local.strategy';
import {JwtStrategy} from './strategies/jwt-auth.strategy';
import {RolesGuard} from './guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
        { name: 'account', schema: AccountSchema },
        { name: 'role', schema: RoleSchema }
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600000s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
