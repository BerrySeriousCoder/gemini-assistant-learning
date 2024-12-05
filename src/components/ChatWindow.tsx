import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, X } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export const ChatWindow: React.FC = () => {
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, config, addMessage } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage({ role: 'user', content: input });
    setInput('');
    
    // Simulate AI response (replace with actual Gemini integration)
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: 'This is a simulated response. Integrate with Gemini API for real responses.',
      });
    }, 1000);
  };

  return (
    <div className={`fixed bottom-4 right-4 w-96 ${isMinimized ? 'h-14' : 'h-[600px]'} bg-white rounded-lg shadow-xl flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: config.primaryColor }}>
        <h3 className="text-white font-semibold">{config.companyName} Chat</h3>
        <div className="flex gap-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="text-white hover:opacity-80">
            <Minimize2 size={18} />
          </button>
          <button className="text-white hover:opacity-80">
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="p-2 rounded-lg"
                style={{ backgroundColor: config.primaryColor }}
              >
                <Send size={20} className="text-white" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};