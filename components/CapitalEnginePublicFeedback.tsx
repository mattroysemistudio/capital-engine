'use client';

import { useState, useRef, useEffect } from 'react';
import { useScreenshot } from '@/hooks/useScreenshot';
import { useLanguageCurrency } from '@/lib/capital-engine/useLanguageCurrency';

interface FeedbackMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function CapitalEnginePublicFeedback() {
  const { language } = useLanguageCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<FeedbackMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { captureViewport } = useScreenshot();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Capture screenshot when modal opens
  useEffect(() => {
    if (isOpen && !screenshot) {
      captureScreenshot();
    }
  }, [isOpen]);

  async function captureScreenshot() {
    const screenshot = await captureViewport();
    if (screenshot) {
      setScreenshot(screenshot);
      // Add initial message with screenshot marker
      const initialMsg = language === 'es'
        ? '¡Puedo ver el Capital Engine! Cuéntame qué piensas. ¿Qué está funcionando bien? ¿Qué es confuso o necesita mejoras?'
        : "I can see the Capital Engine! Tell me what you think. What's working well? What's confusing or needs improvement?";

      setMessages([
        {
          role: 'assistant',
          content: initialMsg,
        },
      ]);
    }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const allMessages = [
        ...messages,
        { role: 'user' as const, content: userMessage },
      ];

      const response = await fetch('/api/capital-engine-public/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: allMessages.map((msg, idx) => ({
            role: msg.role,
            content:
              idx === 0 && screenshot ? '__INITIAL_WITH_SCREENSHOT__' : msg.content,
          })),
          screenshot: messages.length === 0 && screenshot ? screenshot : undefined,
          userEmail,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get feedback response');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Feedback error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  const styles = `
    .feedback-button {
      position: fixed;
      bottom: 32px;
      right: 32px;
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
    }
    .feedback-button:hover {
      background: #9333ea;
      box-shadow: 0 6px 16px rgba(168, 85, 247, 0.4);
    }
    .feedback-button:active {
      transform: scale(0.95);
    }
    .feedback-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .feedback-modal {
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
    .feedback-modal-header {
      padding: 20px;
      border-bottom: 1px solid rgba(48, 54, 61, 0.3);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .feedback-modal-header h3 {
      margin: 0;
      font-family: 'Fraunces', Georgia, serif;
      font-size: 18px;
      font-weight: 700;
      color: #E9ECF1;
    }
    .feedback-modal-close {
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
    .feedback-modal-close:hover {
      color: #E9ECF1;
    }
    .feedback-modal-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .feedback-message {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
    }
    .feedback-message.user {
      justify-content: flex-end;
    }
    .feedback-message-bubble {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
      line-height: 1.5;
    }
    .feedback-message.assistant .feedback-message-bubble {
      background: rgba(48, 54, 61, 0.5);
      color: #E9ECF1;
      border: 1px solid rgba(48, 54, 61, 0.3);
    }
    .feedback-message.user .feedback-message-bubble {
      background: #A855F7;
      color: #0E1117;
    }
    .feedback-modal-input {
      padding: 16px;
      border-top: 1px solid rgba(48, 54, 61, 0.3);
      display: flex;
      gap: 8px;
    }
    .feedback-modal-input input {
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
    .feedback-modal-input input:focus {
      border-color: rgba(168, 85, 247, 0.5);
    }
    .feedback-modal-input button {
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
    .feedback-modal-input button:hover:not(:disabled) {
      background: #9333ea;
    }
    .feedback-modal-input button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;

  return (
    <>
      <style>{styles}</style>

      {/* Feedback Button */}
      <button className="feedback-button" onClick={() => setIsOpen(true)}>
        💬 Feedback
      </button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="feedback-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="feedback-modal-header">
              <h3>Share Feedback</h3>
              <button className="feedback-modal-close" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="feedback-modal-content">
              {messages.map((msg, idx) => (
                <div key={idx} className={`feedback-message ${msg.role}`}>
                  <div className="feedback-message-bubble">{msg.content}</div>
                </div>
              ))}
              {isLoading && (
                <div className="feedback-message assistant">
                  <div className="feedback-message-bubble">
                    <span style={{ opacity: 0.7 }}>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form className="feedback-modal-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Tell me your thoughts..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !inputValue.trim()}>
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
