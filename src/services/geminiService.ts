import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiService {
  private model;

  constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateResponse(
    prompt: string,
    context: string,
    tone: string
  ): Promise<string> {
    try {
      const result = await this.model.generateContent(`
        Context: ${context}
        Tone: ${tone}
        User message: ${prompt}
        
        Respond in a helpful and natural way, maintaining the specified tone.
      `);
      
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      return 'I apologize, but I encountered an error. Please try again later.';
    }
  }
}