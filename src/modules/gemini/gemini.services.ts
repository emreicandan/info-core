import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import env from 'src/environment/env';

@Injectable()
export class GeminiService {
    private readonly genAI: GoogleGenerativeAI;
    private readonly model: any;
    private readonly projectId: string;

    constructor() {
        this.projectId = env.GOOGLE_PROJECT_ID;
        this.genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-pro-exp-03-25' });
    }

    async generateText(prompt: string): Promise<string | null> {
        try {
            const result = await this.model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
            });

            const response = result.response;

            const text = response?.candidates?.[0]?.content?.parts?.[0]?.text;
            return text || null;

        } catch (error) {
            console.error('Gemini API Hatası:', error);
            return null;
        }
    }
}
