'use client';

import { EmptyState } from '@/components/empty-state';

export const LeadSuccess = () => {
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
      action={{
        icon: <span className="material-symbols-rounded">arrow_back</span>,
        variant: 'solid',
        color: 'primary',
        size: 'large',
        href: '/',
        label: 'Voltar para a página inicial',
      }}
    />
  );
};
