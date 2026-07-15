import { useCallback } from 'react';

/**
 * Hook for capturing screenshots of a DOM element
 * Uses html2canvas library
 */
export function useScreenshot() {
  const captureElement = useCallback(async (element: HTMLElement | null): Promise<string | null> => {
    if (!element) return null;

    try {
      // Dynamically import html2canvas to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(element, {
        backgroundColor: '#0E1117',
        scale: 1.5,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Screenshot capture failed:', error);
      return null;
    }
  }, []);

  const captureViewport = useCallback(async (): Promise<string | null> => {
    try {
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(document.body, {
        backgroundColor: '#0E1117',
        scale: 1.5,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Viewport screenshot failed:', error);
      return null;
    }
  }, []);

  return { captureElement, captureViewport };
}
