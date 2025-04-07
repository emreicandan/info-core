import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.services';
import { GeminiScheduler } from './gemini.scheduler';
import { MailerModule } from '../mailer/mailer.module';
import { SchedulerRegistry } from '@nestjs/schedule';

@Module({
    imports: [MailerModule],
    providers: [GeminiService, GeminiScheduler, SchedulerRegistry],
    exports: [GeminiService],
})
export class GeminiModule {}
