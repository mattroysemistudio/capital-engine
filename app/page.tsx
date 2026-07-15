'use client';

import { useState } from 'react';

export default function EmailGatePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/capital-engine-public/send-verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data.message || 'Failed to send verification email');
        return;
      }

      setStatus('success');
      setMessage('Verification email sent. Check your inbox.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
      console.error(error);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '420px', width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              marginBottom: '16px',
              color: '#E9ECF1',
              fontFamily: 'Fraunces, Georgia, serif',
              letterSpacing: '-0.5px',
            }}
          >
            Capital Modeling Engine
          </h1>
          <p style={{ color: '#9AA0AA', fontSize: '15px', margin: 0 }}>
            Verify your email to access the tool
          </p>
        </div>

        {/* Form Card */}
        <div
          style={{
            background: '#161B22',
            border: '1px solid rgba(48, 54, 61, 0.3)',
            borderRadius: '12px',
            padding: '32px',
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Email Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label
                htmlFor="email"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#9AA0AA',
                }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={status === 'loading'}
                style={{
                  background: 'rgba(22, 27, 34, 0.8)',
                  border: '1px solid rgba(48, 54, 61, 0.8)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  color: '#E9ECF1',
                  fontSize: '14px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  cursor: status === 'loading' ? 'not-allowed' : 'text',
                  opacity: status === 'loading' ? 0.6 : 1,
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: status === 'loading' ? '#6E7681' : '#A855F7',
                color: '#0E1117',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                opacity: status === 'loading' ? 0.7 : 1,
              }}
            >
              {status === 'loading' ? 'Sending...' : 'Send Verification Link'}
            </button>

            {/* Status Messages */}
            {status === 'success' && (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.14)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  color: '#10B981',
                  fontSize: '13px',
                  borderLeft: '3px solid #10B981',
                }}
              >
                {message}
              </div>
            )}

            {status === 'error' && (
              <div
                style={{
                  background: 'rgba(198, 40, 40, 0.14)',
                  border: '1px solid rgba(198, 40, 40, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  color: '#C62828',
                  fontSize: '13px',
                  borderLeft: '3px solid #C62828',
                }}
              >
                {message}
              </div>
            )}
          </form>

          {/* Helper Text */}
          <p
            style={{
              marginTop: '20px',
              fontSize: '12px',
              color: '#6E7681',
              textAlign: 'center',
            }}
          >
            We'll send a verification link to your email. The link expires in 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
