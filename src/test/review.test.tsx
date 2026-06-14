import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import i18n from '@/lib/i18n';
import { Spinner, LoadingState } from '@/components/ui/spinner';

describe('admin i18n namespace (regression)', () => {
  it('resolves admin labels via the namespace separator', () => {
    // The bug: t('admin.dashboard') returns the raw key because admin keys live
    // in the 'admin' namespace, not the default 'common' one.
    expect(i18n.t('admin:dashboard')).toBe('Admin Dashboard');
    expect(i18n.t('admin:insights')).toBe('AI Insights');
    expect(i18n.t('admin.dashboard')).not.toBe('Admin Dashboard');
  });
});

describe('Spinner', () => {
  it('exposes an accessible status role', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('LoadingState renders a spinner', () => {
    render(<LoadingState size="lg" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
