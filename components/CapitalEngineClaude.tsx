'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

import type { Language, Currency } from '@/lib/capital-engine/i18n-context';
import { getClaudeSystemPromptLanguage } from '@/lib/capital-engine/i18n-context';

interface CapitalEngineClaudeProps {
  token: string;
  investorEmail: string;
  scenarioName: string;
  language?: Language;
  currency?: Currency;
  exchangeRate?: number;
}

// System prompt will be set based on language selection

const BASE_SYSTEM_PROMPT = `You are an expert capital structure advisor specializing in the Dinosaur Pizza investment in Mexico City (CDMX). You have deep knowledge of:

- Capital stacking and deal mechanics
- The Dinosaur Pizza operational structure and unit economics
- HoldCo / OpCo / Principle entity relationships
- Preferred returns, promote structures, and equity distributions
- Path A (equity investment with 10% pref + 66% promote) vs Path B (LOC with 20% interest converting to equity)
- How capital flows through the structure from sources → HoldCo → OpCo → distributions back to investors
- Risk allocation between investors and operators
- How different capital amounts, rates, and time horizons affect final distributions

The user is exploring different capital scenarios. Help them understand:
1. How each component of the structure works
2. Why certain mechanics are in place (e.g., why the 66% promote incentivizes Edgar)
3. What happens when they adjust parameters (capital amounts, preferred rates, horizon, exit multiples)
4. Implications of Path A vs Path B for different investor profiles

Be precise about numbers and structures. Reference the specific scenario when helpful. Ask clarifying questions to ensure they understand the full picture.`;

export default function CapitalEngineClaude({
  token,
  investorEmail,
  scenarioName,
  language = 'en',
  currency = 'USD',
  exchangeRate = 17.5,
}: CapitalEngineClaudeProps) {
  const [scenario, setScenario] = useState<any>(null);
  const [isLoadingScenario, setIsLoadingScenario] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get language-specific system prompt
  const systemPrompt = getClaudeSystemPromptLanguage(language);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/capital-engine/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          token,
          scenario: scenario || {},
          system: systemPrompt,
          language,
          currency,
          exchangeRate,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch scenario state periodically
  useEffect(() => {
    async function loadScenario() {
      setIsLoadingScenario(true);
      try {
        const response = await fetch(`/api/capital-engine/scenario`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        if (response.ok) {
          const data = await response.json();
          setScenario(data.scenario);
        }
      } catch (err) {
        console.error('Failed to load scenario:', err);
      }
      setIsLoadingScenario(false);
    }

    loadScenario();
    const interval = setInterval(loadScenario, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [token]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      background: '#0E1117',
      borderLeft: '1px solid rgba(48, 54, 61, 0.6)',
      padding: '24px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(48, 54, 61, 0.6)' }}>
        <h3 style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontSize: '18px',
          fontWeight: 600,
          color: '#E9ECF1',
          margin: '0 0 8px 0',
          letterSpacing: '-0.5px',
        }}>
          Claude Specialist
        </h3>
        <p style={{
          fontSize: '12px',
          color: '#9AA0AA',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          Capital Structure Expert
        </p>
      </div>

      {/* Scenario Context */}
      {scenario && (
        <div style={{
          marginBottom: '16px',
          padding: '12px',
          background: 'rgba(168, 85, 247, 0.08)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: '8px',
          fontSize: '11px',
        }}>
          <div style={{ color: '#9AA0AA', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Current Scenario
          </div>
          <div style={{ color: '#E9ECF1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>Total Cap: <strong>${scenario.totalCap || '—'}k</strong></div>
            <div>Pref Rate: <strong>{scenario.prefRate || '—'}%</strong></div>
            <div>Horizon: <strong>{scenario.horizon || '—'} yrs</strong></div>
            <div>Exit Mult: <strong>{scenario.exitMultiple || '—'}x</strong></div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {messages.length === 0 && (
          <div style={{
            color: '#6E7681',
            fontSize: '13px',
            fontStyle: 'italic',
            textAlign: 'center',
            paddingTop: '40px',
          }}>
            Ask anything about the capital structure, Path A vs B, or how adjusting parameters affects returns.
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '12px',
                borderRadius: '8px',
                background:
                  message.role === 'user'
                    ? 'rgba(168, 85, 247, 0.15)'
                    : 'rgba(255, 77, 157, 0.08)',
                border:
                  message.role === 'user'
                    ? '1px solid rgba(168, 85, 247, 0.3)'
                    : '1px solid rgba(255, 77, 157, 0.2)',
                color: '#E9ECF1',
                fontSize: '13px',
                lineHeight: '1.5',
              }}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ color: '#6E7681', fontSize: '12px', fontStyle: 'italic' }}>
            Claude is thinking...
          </div>
        )}

        {error && (
          <div style={{ color: '#FF4D9D', fontSize: '12px' }}>
            Error: {error.message}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the structure..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '10px 12px',
            fontSize: '13px',
            background: 'rgba(48, 54, 61, 0.4)',
            border: '1px solid rgba(48, 54, 61, 0.6)',
            borderRadius: '6px',
            color: '#E9ECF1',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          style={{
            padding: '10px 16px',
            fontSize: '13px',
            background: '#A855F7',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: isLoading || !input.trim() ? 0.5 : 1,
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
