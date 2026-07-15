import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Capital Modeling Engine',
  description: 'Unified capital structure modeling and scenario analysis',
};

export default function CapitalEnginePublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html {
          scroll-behavior: smooth;
          background: #0E1117;
          color: #E9ECF1;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-size: 15px;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }
        body {
          background: #0E1117;
          color: #E9ECF1;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-size: 15px;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
      {children}
    </>
  );
}
