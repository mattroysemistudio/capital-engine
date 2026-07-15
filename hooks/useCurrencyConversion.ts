import { useState, useEffect } from 'react';

interface ExchangeRate {
  rate: number;
  timestamp: number;
  source: 'cached' | 'live';
}

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

/**
 * Hook for USD ↔ MXN currency conversion
 * Uses Banxico API with local caching
 */
export function useCurrencyConversion() {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        setLoading(true);
        setError(null);

        // Check cache first
        const cached = localStorage.getItem('capital-engine:exchange-rate');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_DURATION) {
            setExchangeRate({ ...parsed, source: 'cached' });
            setLoading(false);
            return;
          }
        }

        // Fetch from Banxico API
        const response = await fetch('/api/capital-engine-public/exchange-rate');
        if (!response.ok) throw new Error('Failed to fetch exchange rate');

        const data = await response.json();
        const rateData: ExchangeRate = {
          rate: data.rate,
          timestamp: Date.now(),
          source: 'live',
        };

        // Cache the rate
        localStorage.setItem('capital-engine:exchange-rate', JSON.stringify(rateData));
        setExchangeRate(rateData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Fallback to approximate rate if fetch fails
        setExchangeRate({
          rate: 20.5, // Approximate MXN/USD rate
          timestamp: Date.now(),
          source: 'cached',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchRate();
  }, []);

  function convertUsdToMxn(usd: number): number {
    if (!exchangeRate) return usd * 20.5; // Fallback
    return usd * exchangeRate.rate;
  }

  function convertMxnToUsd(mxn: number): number {
    if (!exchangeRate) return mxn / 20.5; // Fallback
    return mxn / exchangeRate.rate;
  }

  function format(amount: number, currency: 'USD' | 'MXN'): string {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  }

  return {
    exchangeRate: exchangeRate?.rate || 20.5,
    loading,
    error,
    convertUsdToMxn,
    convertMxnToUsd,
    format,
    lastUpdated: exchangeRate?.timestamp,
  };
}
