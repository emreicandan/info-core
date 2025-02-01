import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentityModule } from './modules/identity/identity.module';
import { AuthModule } from './modules/auth/auth.module';
import { AddressModule } from './modules/address/address.module';
import env from './environment/env';

@Module({
  imports: [MongooseModule.forRoot(env.MONGO_URI), UserModule , IdentityModule , AuthModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
