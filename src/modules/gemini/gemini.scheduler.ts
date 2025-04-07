import { Injectable, Logger } from "@nestjs/common";
import { GeminiService } from "./gemini.services";
import { Cron, CronExpression } from "@nestjs/schedule";
import { MailService } from "../mailer/mailer.service";


@Injectable()
export class GeminiScheduler {
    private readonly logger = new Logger(GeminiScheduler.name);

    constructor(private readonly geminiService: GeminiService,
        private readonly mailer: MailService
    ) { }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleScheduledPropmt() {
        const date = new Date();
        const prompt = `${date.setDate(date.getDay() - 1)} Bugüne özel kripto piyasasındaki önemli gelişmeleri verirmisin`;
        this.logger.log('Scheduled Gemini prompt started...');

        const res = await this.geminiService.generateText(prompt);

        if (res) {
            this.logger.log('Gemini Response :', res)
            this.mailer.sendMail('emreicandan@gmail.com', 'Daily Cripto Report', JSON.stringify(res));
        } else {
            this.logger.warn('Gemini Response Null')
        }
    }

}