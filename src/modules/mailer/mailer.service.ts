import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import env from 'src/environment/env';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: env.PROJECT_MAIL,
                pass: env.PROJECT_PASSWORD,
            },
        });
    }

    async sendMail(to: string, subject: string, text: string): Promise<void> {
        const mailOptions = {
            from: 'emreecndnn@gmail.com',
            to,
            subject,
            text,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}
