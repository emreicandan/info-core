import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import env from 'tools/environment/env';

@Module({
  imports: [MongooseModule.forRoot(env.MONGO_URI), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
