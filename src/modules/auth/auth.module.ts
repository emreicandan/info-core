import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UserModule } from '../user/user.module';
import { IdentityModule } from '../identity/identity.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthValidation } from './auth.validation';
import env from 'src/environment/env';

@Module({
  controllers: [AuthController],
  providers: [AuthService , AuthValidation],
  exports: [AuthService],
  imports: [UserModule, IdentityModule, JwtModule.register({ secret: env.JWT_SECRET_KEY, signOptions: { expiresIn: '72h' } })]
})
export class AuthModule { }