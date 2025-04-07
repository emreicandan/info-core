import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentityModule } from './modules/identity/identity.module';
import { AuthModule } from './modules/auth/auth.module';
import { AddressModule } from './modules/address/address.module';
import { ConfigModule } from '@nestjs/config'
import env from './environment/env';
import { ApiKeyMiddleware } from './common/middleware/api-key.middleware';
import { StorageModule } from './modules/storage/storage.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GeminiModule } from './modules/gemini/gemini.module';
import { MailerModule } from './modules/mailer/mailer.module';

@Module({
  imports: [
    MongooseModule.forRoot(env.MONGO_URI),
    ConfigModule.forRoot(),
    UserModule,
    IdentityModule,
    AuthModule,
    AddressModule,
    StorageModule,
    ScheduleModule.forRoot(),
    GeminiModule,
    MailerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
