// Cerebras AI API Service
const CEREBRAS_API_KEY = 'csk-x25yt555w3epxmycj9pt2yk9xep8tdmfrhf54fne49669h3d';
const CEREBRAS_API_URL = 'https://api.cerebras.ai/v1/chat/completions';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface CerebrasResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class CerebrasAPI {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = CEREBRAS_API_KEY;
    this.apiUrl = CEREBRAS_API_URL;
  }

  async chat(messages: Message[], temperature: number = 0.7, maxTokens: number = 1000): Promise<string> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama3.1-8b',
          messages: messages,
          temperature: temperature,
          max_tokens: maxTokens,
          top_p: 1,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data: CerebrasResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Cerebras API Error:', error);
      throw error;
    }
  }

  async analyzeNews(newsText: string): Promise<{
    prediction: 'REAL' | 'FAKE';
    confidence: number;
    reasoning: string;
    sources: string[];
  }> {
    const messages: Message[] = [
      {
        role: 'system',
        content: `You are an expert news fact-checker and analyst. Analyze the given news and determine if it's REAL or FAKE. Provide:
1. A prediction (REAL or FAKE)
2. Confidence score (0-100)
3. Detailed reasoning
4. Potential sources to verify

Return response in JSON format:
{
  "prediction": "REAL" or "FAKE",
  "confidence": 0-100,
  "reasoning": "detailed explanation",
  "sources": ["source1", "source2", "source3"]
}`
      },
      {
        role: 'user',
        content: `Analyze this news article:\n\n${newsText}`
      }
    ];

    try {
      const response = await this.chat(messages, 0.3, 1500);
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        return {
          prediction: result.prediction === 'REAL' ? 'REAL' : 'FAKE',
          confidence: result.confidence / 100,
          reasoning: result.reasoning,
          sources: result.sources || []
        };
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('News analysis error:', error);
      throw error;
    }
  }

  async generateIdeas(topic: string, count: number = 5): Promise<string[]> {
    const messages: Message[] = [
      {
        role: 'system',
        content: 'You are a creative idea generator. Generate innovative, unique, and practical ideas based on the given topic. Return only a JSON array of ideas.'
      },
      {
        role: 'user',
        content: `Generate ${count} creative and innovative ideas about: ${topic}\n\nReturn only a JSON array like: ["idea1", "idea2", "idea3", ...]`
      }
    ];

    try {
      const response = await this.chat(messages, 0.9, 1000);
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback if JSON parsing fails
      return response.split('\n').filter(line => line.trim().length > 0).slice(0, count);
    } catch (error) {
      console.error('Idea generation error:', error);
      throw error;
    }
  }

  async askQuestion(question: string, conversationHistory: Message[] = []): Promise<string> {
    const messages: Message[] = [
      {
        role: 'system',
        content: 'You are a helpful, friendly, and knowledgeable AI assistant. Provide clear, accurate, and helpful responses.'
      },
      ...conversationHistory,
      {
        role: 'user',
        content: question
      }
    ];

    return await this.chat(messages, 0.7, 1500);
  }

  async summarizeText(text: string): Promise<string> {
    const messages: Message[] = [
      {
        role: 'system',
        content: 'You are an expert at summarizing text concisely while retaining key information.'
      },
      {
        role: 'user',
        content: `Summarize the following text in 2-3 sentences:\n\n${text}`
      }
    ];

    return await this.chat(messages, 0.3, 500);
  }

  async improveWriting(text: string): Promise<string> {
    const messages: Message[] = [
      {
        role: 'system',
        content: 'You are an expert writing assistant. Improve the given text while maintaining its original meaning.'
      },
      {
        role: 'user',
        content: `Improve this text:\n\n${text}`
      }
    ];

    return await this.chat(messages, 0.5, 1500);
  }
}

export const cerebrasAPI = new CerebrasAPI();
