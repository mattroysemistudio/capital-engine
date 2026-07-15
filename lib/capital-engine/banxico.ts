/**
 * Banxico (Banco de México) exchange rate integration
 * Uses their free public API to fetch USD->MXN rates
 */

interface BanxicoResponse {
  bmx: {
    series: Array<{
      idSerie: string;
      titulo: string;
      datos: Array<{
        fecha: string;
        dato: string;
      }>;
    }>;
  };
}

const BANXICO_API = 'https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?accion=consultarCuadro';
const USD_MXN_SERIE = 'SF63528'; // Official USD to MXN exchange rate

/**
 * Fetch current USD to MXN exchange rate from Banxico
 * Returns rate as a number (e.g., 17.50 means 1 USD = 17.50 MXN)
 */
export async function getUSDToMXNRate(): Promise<number> {
  try {
    // Banxico's API endpoint for exchange rates
    const response = await fetch(
      `https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?accion=consultarCuadro&idCuadro=CF373&locale=en`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Banxico API error:', response.status);
      return getDefaultRate(); // Fallback to approximate rate
    }

    const data = await response.json();

    // Extract the most recent rate from Banxico response
    if (data.bmx?.series?.[0]?.datos?.[0]?.dato) {
      const rate = parseFloat(data.bmx.series[0].datos[0].dato);
      if (!isNaN(rate) && rate > 0) {
        return rate;
      }
    }

    return getDefaultRate();
  } catch (error) {
    console.error('Failed to fetch Banxico rate:', error);
    return getDefaultRate();
  }
}

/**
 * Fallback exchange rate (approximate, updated periodically)
 * As of July 2026: ~17.50 MXN per USD
 */
function getDefaultRate(): number {
  return 17.5; // Approximate - will be replaced with live rate
}

/**
 * Format currency value with proper locale
 */
export function formatCurrency(
  amount: number,
  currency: 'USD' | 'MXN',
  locale: 'en' | 'es' = 'en'
): string {
  const formatter = new Intl.NumberFormat(locale === 'es' ? 'es-MX' : 'en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
}

/**
 * Convert USD amount to MXN using provided rate
 */
export function convertUSDToMXN(usdAmount: number, rate: number): number {
  return Math.round(usdAmount * rate);
}
