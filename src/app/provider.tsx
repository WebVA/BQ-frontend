'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import * as React from 'react';
import { WagmiProvider } from 'wagmi';

import { config } from '@/lib/config';
import { metadata, projectId } from '@/lib/wagmi';

import WithSession from '@/components/withSession';

import { ClaimProvider } from '@/contexts/ClaimContext';
import { CoverProvider } from '@/contexts/CoverContext';

const queryClient = new QueryClient();

if (!projectId) throw new Error('Project ID is not defined');

// Create modal
createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiProvider config={config}>
      <CoverProvider>
        <ClaimProvider>
          <QueryClientProvider client={queryClient}>
            {mounted && children}
          </QueryClientProvider>
        </ClaimProvider>
      </CoverProvider>
    </WagmiProvider>
  );
}

export default WithSession(Providers);
