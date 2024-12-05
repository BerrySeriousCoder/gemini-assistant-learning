import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ChatMessage, ChatbotConfig, ChatAnalytics } from '../types';

interface ChatStore {
  messages: ChatMessage[];
  config: ChatbotConfig;
  analytics: ChatAnalytics;
  botId: string;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateConfig: (config: Partial<ChatbotConfig>, userId: string) => Promise<void>;
  loadConfig: (userId: string) => Promise<void>;
  updateAnalytics: (analytics: Partial<ChatAnalytics>) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  botId: nanoid(),
  config: {
    greeting: 'Hello! How can I help you today?',
    tone: 'professional',
    primaryColor: '#2563eb',
    companyName: 'Your Company',
    websiteInfo: 'Welcome to our website.',
  },
  analytics: {
    totalChats: 0,
    averageDuration: 0,
    commonQuestions: [],
    userSatisfaction: 0,
  },
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: nanoid(),
          timestamp: new Date(),
        },
      ],
    })),
  updateConfig: async (newConfig, userId) => {
    const config = { ...get().config, ...newConfig };
    const botId = get().botId;
    
    // Save to Firestore
    await setDoc(doc(db, 'users', userId, 'bots', botId), {
      config,
      updatedAt: new Date(),
    });
    
    set({ config });
  },
  loadConfig: async (userId) => {
    const botId = get().botId;
    const docRef = doc(db, 'users', userId, 'bots', botId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      set({ config: data.config });
    } else {
      // Create default config for new users
      const defaultConfig = get().config;
      await setDoc(docRef, {
        config: defaultConfig,
        createdAt: new Date(),
      });
    }
  },
  updateAnalytics: (newAnalytics) =>
    set((state) => ({
      analytics: { ...state.analytics, ...newAnalytics },
    })),
}));