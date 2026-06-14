import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import { AuthProvider } from '@/contexts/AuthContext';

describe('Dashboard hub', () => {
  it('renders grouped feature directory with working links', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <DashboardOverview />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Care & Resources')).toBeInTheDocument();
    expect(screen.getByText('Power & Organizing')).toBeInTheDocument();

    const mutualAid = screen.getByRole('link', { name: /Mutual Aid/i });
    expect(mutualAid).toHaveAttribute('href', '/mutual-aid');
  });
});
