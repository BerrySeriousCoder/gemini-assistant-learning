import React, { useEffect } from 'react';
import { useChatStore } from '../../store/chatStore';
import { useAuthStore } from '../../store/authStore';

export const ConfigPanel: React.FC = () => {
  const { config, updateConfig, loadConfig } = useChatStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      loadConfig(user.uid);
    }
  }, [user, loadConfig]);

  const handleConfigUpdate = async (key: keyof typeof config, value: string) => {
    if (user) {
      await updateConfig({ [key]: value }, user.uid);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Chatbot Configuration</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Greeting Message
          </label>
          <input
            type="text"
            value={config.greeting}
            onChange={(e) => handleConfigUpdate('greeting', e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conversation Tone
          </label>
          <select
            value={config.tone}
            onChange={(e) => handleConfigUpdate('tone', e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="friendly">Friendly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Color
          </label>
          <input
            type="color"
            value={config.primaryColor}
            onChange={(e) => handleConfigUpdate('primaryColor', e.target.value)}
            className="w-full p-2 border rounded-md h-10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={config.companyName}
            onChange={(e) => handleConfigUpdate('companyName', e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website Information
          </label>
          <textarea
            value={config.websiteInfo}
            onChange={(e) => handleConfigUpdate('websiteInfo', e.target.value)}
            className="w-full p-2 border rounded-md h-32"
          />
        </div>
      </div>
    </div>
  );
};