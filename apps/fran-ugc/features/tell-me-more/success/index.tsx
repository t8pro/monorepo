'use client';

import { EmptyState } from '@/components/empty-state';

export const TellMeMoreSuccess = () => {
  return (
    <EmptyState
      title="Obrigado!"
      description="Recebemos suas informações. Em breve você receberá o guia por email."
      icon={
        <span
          className="material-symbols-rounded"
          style={{ fontSize: '64px', color: '#22c55e' }}
        >
          check_circle
        </span>
      }
    />
  );
};

