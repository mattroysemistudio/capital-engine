'use client';

import { useState } from 'react';
import CapitalEngineClaude from './CapitalEngineClaude';
import CapitalEngineCore from './CapitalEngineCore';
import { useLanguageCurrency } from '@/lib/capital-engine/useLanguageCurrency';

interface CapitalEngineWithClaudeProps {
  token: string;
  investorEmail: string;
  scenarioName: string;
}

export default function CapitalEngineWithClaude({
  token,
  investorEmail,
  scenarioName,
}: CapitalEngineWithClaudeProps) {
  const [scenarioState, setScenarioState] = useState<any>(null);
  const { language, setLanguage, currency, setCurrency, exchangeRate, loadingRate } = useLanguageCurrency();

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', flexDirection: 'column' }}>
      {/* Top Bar with Language/Currency Toggles */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 20px',
        background: '#0E1117',
        borderBottom: '1px solid rgba(48, 54, 61, 0.6)',
      }}>
        {/* Language Toggle */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#9AA0AA', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {language === 'en' ? 'English' : 'Español'}
          </span>
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            style={{
              padding: '6px 12px',
              background: language === 'en' ? '#A855F7' : 'rgba(48, 54, 61, 0.6)',
              color: '#E9ECF1',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (language !== 'en') (e.target as HTMLButtonElement).style.background = 'rgba(168, 85, 247, 0.2)';
            }}
            onMouseLeave={(e) => {
              if (language !== 'en') (e.target as HTMLButtonElement).style.background = 'rgba(48, 54, 61, 0.6)';
            }}
          >
            {language === 'en' ? 'EN' : 'ES'}
          </button>
        </div>

        {/* Currency Toggle */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#9AA0AA', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {currency === 'USD' ? 'USD' : 'MXN'}
            {!loadingRate && exchangeRate && (
              <span style={{ color: '#6E7681', marginLeft: '4px' }}>
                (1:{exchangeRate.toFixed(2)})
              </span>
            )}
          </span>
          <button
            onClick={() => setCurrency(currency === 'USD' ? 'MXN' : 'USD')}
            style={{
              padding: '6px 12px',
              background: currency === 'USD' ? '#A855F7' : 'rgba(48, 54, 61, 0.6)',
              color: '#E9ECF1',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (currency !== 'USD') (e.target as HTMLButtonElement).style.background = 'rgba(168, 85, 247, 0.2)';
            }}
            onMouseLeave={(e) => {
              if (currency !== 'USD') (e.target as HTMLButtonElement).style.background = 'rgba(48, 54, 61, 0.6)';
            }}
          >
            {currency === 'USD' ? '$' : '💱'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, width: '100%', overflow: 'hidden' }}>
        {/* Left: Capital Engine Tool (70%) */}
        <div style={{ flex: '0 0 70%', overflow: 'auto', background: '#0E1117' }}>
          <CapitalEngineCore
            token={token}
            isPublic={true}
            investorEmail={investorEmail}
            scenarioName={scenarioName}
            onScenarioChange={setScenarioState}
          />
        </div>

        {/* Right: Claude Sidebar (30%) */}
        <div style={{ flex: '0 0 30%', background: '#0E1117', borderLeft: '1px solid rgba(48, 54, 61, 0.6)', overflow: 'hidden' }}>
          <CapitalEngineClaude
            token={token}
            investorEmail={investorEmail}
            scenarioName={scenarioName}
            language={language}
            currency={currency}
            exchangeRate={exchangeRate}
          />
        </div>
      </div>
    </div>
  );
}
