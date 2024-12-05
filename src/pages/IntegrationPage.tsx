import React, { useState, useEffect } from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';

export const IntegrationPage: React.FC = () => {
  const { config, botId } = useChatStore();
  const { user } = useAuthStore();
  const [copied, setCopied] = useState(false);

  const iframeCode = `<iframe
  src="${window.location.origin}/chatbot-embed/${user?.uid}/${botId}"
  width="400"
  height="600"
  style="border: none; position: fixed; bottom: 20px; right: 20px; z-index: 1000;"
></iframe>`;

  const scriptCode = `<script>
  (function() {
    const script = document.createElement('script');
    script.src = '${window.location.origin}/chatbot.js';
    script.async = true;
    script.dataset.userId = '${user?.uid}';
    script.dataset.botId = '${botId}';
    script.dataset.config = '${JSON.stringify(config)}';
    document.head.appendChild(script);
  })();
</script>`;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">Integration Guide</h1>

      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Unique Bot ID</h2>
          <p className="text-gray-600 mb-4">
            This is your unique bot identifier: <code className="bg-gray-100 px-2 py-1 rounded">{botId}</code>
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Iframe Integration</h2>
          <p className="text-gray-600 mb-4">
            Add this code to your website to embed the chatbot using an iframe:
          </p>
          <div className="relative">
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{iframeCode}</code>
            </pre>
            <button
              onClick={() => handleCopy(iframeCode)}
              className="absolute top-2 right-2 p-2 hover:bg-gray-200 rounded"
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">JavaScript Integration</h2>
          <p className="text-gray-600 mb-4">
            Alternatively, you can use this JavaScript snippet for more flexibility:
          </p>
          <div className="relative">
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{scriptCode}</code>
            </pre>
            <button
              onClick={() => handleCopy(scriptCode)}
              className="absolute top-2 right-2 p-2 hover:bg-gray-200 rounded"
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="border rounded-lg p-4 h-[600px] relative">
            <iframe
              src={`/chatbot-embed/${user?.uid}/${botId}`}
              className="w-full h-full"
              title="Chatbot Preview"
            />
          </div>
        </section>
      </div>
    </div>
  );
};