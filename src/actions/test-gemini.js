'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

export async function testGeminiModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Try different model names
        const modelsToTry = [
            'gemini-1.5-flash',
            'gemini-1.5-pro',
            'gemini-pro',
            'gemini-1.0-pro',
            'models/gemini-1.5-flash',
            'models/gemini-1.5-pro'
        ];

        const results = [];

        for (const modelName of modelsToTry) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent('Hello');
                results.push({ model: modelName, status: 'SUCCESS', response: 'Works!' });
            } catch (error) {
                results.push({
                    model: modelName,
                    status: 'FAILED',
                    error: error.message,
                    statusCode: error.status
                });
            }
        }

        return { success: true, results };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
