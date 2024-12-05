export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatbotConfig {
  greeting: string;
  tone: 'professional' | 'casual' | 'friendly';
  primaryColor: string;
  companyName: string;
  websiteInfo: string;
  avatar?: string;
  customCSS?: string;
  responseDelay?: number;
  maxMessages?: number;
  autoGreet?: boolean;
  businessHours?: {
    enabled: boolean;
    timezone: string;
    hours: { start: string; end: string }[];
  };
}

export interface ChatAnalytics {
  totalChats: number;
  averageDuration: number;
  commonQuestions: { question: string; count: number }[];
  userSatisfaction: number;
  dailyChats: { date: string; count: number }[];
  responseTime: number;
  userRetention: number;
}