'use client';

import { useState, useEffect } from 'react';
import type { Language, Currency } from './i18n-context';
import { getUSDToMXNRate } from './banxico';

export function useLanguageCurrency() {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(17.5); // Default rate
  const [loadingRate, setLoadingRate] = useState(true);

  // Fetch exchange rate on mount
  useEffect(() => {
    async function fetchRate() {
      setLoadingRate(true);
      try {
        const rate = await getUSDToMXNRate();
        setExchangeRate(rate);
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        // Keep default rate
      } finally {
        setLoadingRate(false);
      }
    }

    fetchRate();
    // Refresh rate every hour
    const interval = setInterval(fetchRate, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Convert amount based on current currency
  const convertAmount = (usdAmount: number): number => {
    if (currency === 'MXN') {
      return Math.round(usdAmount * exchangeRate);
    }
    return usdAmount;
  };

  // Format currency display
  const formatCurrency = (amount: number): string => {
    const formatter = new Intl.NumberFormat(
      language === 'es' ? 'es-MX' : 'en-US',
      {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
    );
    return formatter.format(amount);
  };

  // Get currency symbol
  const getCurrencySymbol = (): string => {
    return currency === 'MXN' ? '$' : '$';
  };

  return {
    language,
    setLanguage,
    currency,
    setCurrency,
    exchangeRate,
    loadingRate,
    convertAmount,
    formatCurrency,
    getCurrencySymbol,
  };
}
