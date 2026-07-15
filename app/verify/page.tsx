'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function VerifyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    async function verify() {
      if (!token) {
        setStatus('error');
        setMessage('No verification token provided');
        return;
      }

      try {
        const res = await fetch('/api/capital-engine-public/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus('error');
          setMessage(data.message || 'Verification failed. The link may have expired.');
          return;
        }

        setStatus('success');
        setMessage('Email verified! Redirecting to the engine...');

        // Redirect after 1.5 seconds
        setTimeout(() => {
          router.push('/capital-engine-public/engine');
        }, 1500);
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred during verification. Please try again.');
        console.error(error);
      }
    }

    verify();
  }, [token, router]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '420px', width: '100%', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 700,
            marginBottom: '24px',
            color: '#E9ECF1',
            fontFamily: 'Fraunces, Georgia, serif',
            letterSpacing: '-0.5px',
          }}
        >
          {status === 'verifying' && 'Verifying...'}
          {status === 'success' && '✓ Verified'}
          {status === 'error' && 'Verification Failed'}
        </h1>

        <p style={{ color: '#9AA0AA', fontSize: '15px', margin: 0, marginBottom: '20px' }}>
          {message}
        </p>

        {status === 'error' && (
          <a
            href="/capital-engine-public"
            style={{
              display: 'inline-block',
              background: '#A855F7',
              color: '#0E1117',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '13px',
              marginTop: '20px',
            }}
          >
            Try Again
          </a>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <VerifyPageContent />
    </Suspense>
  );
}
