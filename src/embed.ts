// Chatbot embed script
export const generateEmbedScript = (config: any) => `
  (function() {
    const script = document.createElement('script');
    script.src = '${window.location.origin}/chatbot.js';
    script.async = true;
    script.dataset.config = JSON.stringify(${JSON.stringify(config)});
    document.head.appendChild(script);
  })();
`;