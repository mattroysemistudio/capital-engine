'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguageCurrency } from '@/lib/capital-engine/useLanguageCurrency';

interface ExpertMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function CapitalEngineExpert() {
  const { language, currency } = useLanguageCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ExpertMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content:
            "I'm your Capital Engine expert. Ask me anything about the structure, calculations, entities, investor returns, capital flows, or how to model different scenarios. What would you like to understand?",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/capital-engine-public/expert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          language,
          currency,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get expert response');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Expert error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an issue. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  const styles = `
    .expert-button {
      position: fixed;
      bottom: 32px;
      right: 104px;
      background: #A855F7;
      color: #0E1117;
      border: none;
      border-radius: 8px;
      padding: 12px 20px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
      transition: all 0.2s ease;
      z-index: 40;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .expert-button:hover {
      background: #9333ea;
      box-shadow: 0 6px 16px rgba(168, 85, 247, 0.4);
    }
    .expert-button:active {
      transform: scale(0.95);
    }
    .expert-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .expert-modal {
      background: #161B22;
      border: 1px solid rgba(48, 54, 61, 0.3);
      border-radius: 12px;
      width: 100%;
      max-width: 500px;
      height: 600px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    }
    .expert-modal-header {
      padding: 20px;
      border-bottom: 1px solid rgba(48, 54, 61, 0.3);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .expert-modal-header h3 {
      margin: 0;
      font-family: 'Fraunces', Georgia, serif;
      font-size: 18px;
      font-weight: 700;
      color: #E9ECF1;
    }
    .expert-modal-close {
      background: none;
      border: none;
      color: #9AA0AA;
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .expert-modal-close:hover {
      color: #E9ECF1;
    }
    .expert-modal-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .expert-message {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
    }
    .expert-message.user {
      justify-content: flex-end;
    }
    .expert-message-bubble {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
      line-height: 1.5;
    }
    .expert-message.assistant .expert-message-bubble {
      background: rgba(48, 54, 61, 0.5);
      color: #E9ECF1;
      border: 1px solid rgba(48, 54, 61, 0.3);
    }
    .expert-message.user .expert-message-bubble {
      background: #A855F7;
      color: #0E1117;
    }
    .expert-modal-input {
      padding: 16px;
      border-top: 1px solid rgba(48, 54, 61, 0.3);
      display: flex;
      gap: 8px;
    }
    .expert-modal-input input {
      flex: 1;
      background: rgba(22, 27, 34, 0.8);
      border: 1px solid rgba(48, 54, 61, 0.8);
      border-radius: 6px;
      padding: 8px 12px;
      color: #E9ECF1;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 13px;
      outline: none;
    }
    .expert-modal-input input:focus {
      border-color: rgba(168, 85, 247, 0.5);
    }
    .expert-modal-input button {
      background: #A855F7;
      color: #0E1117;
      border: none;
      border-radius: 6px;
      padding: 8px 14px;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .expert-modal-input button:hover:not(:disabled) {
      background: #9333ea;
    }
    .expert-modal-input button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;

  return (
    <>
      <style>{styles}</style>

      {/* Expert Button */}
      <button className="expert-button" onClick={() => setIsOpen(true)} title="Expert Advisor">
        ⚡
      </button>

      {/* Expert Modal */}
      {isOpen && (
        <div className="expert-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="expert-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="expert-modal-header">
              <h3>Capital Engine Expert</h3>
              <button className="expert-modal-close" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="expert-modal-content">
              {messages.map((msg, idx) => (
                <div key={idx} className={`expert-message ${msg.role}`}>
                  <div className="expert-message-bubble">{msg.content}</div>
                </div>
              ))}
              {isLoading && (
                <div className="expert-message assistant">
                  <div className="expert-message-bubble">
                    <span style={{ opacity: 0.7 }}>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form className="expert-modal-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !inputValue.trim()}>
                Ask
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
