'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Reshaped } from 'reshaped';

// Lazy load ToastContainer as it's not critical for initial render
const ToastContainer = dynamic(
  () => import('react-toastify').then(mod => ({ default: mod.ToastContainer })),
  { ssr: false },
);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <Reshaped theme="fran">
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer />
      </QueryClientProvider>
    </Reshaped>
  );
};
