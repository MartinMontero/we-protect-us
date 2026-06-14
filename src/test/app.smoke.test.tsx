import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('App smoke tests', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('boots the providers, router and i18n and renders the landing hero', async () => {
    render(<App />);
    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/We Protect Us/i);
    expect(heading).toHaveTextContent(/Together We Rise/i);
  });

  it('landing feature cards link to real routes, not placeholders', async () => {
    render(<App />);
    const links = await screen.findAllByRole('link', { name: /explore tool/i });
    expect(links.length).toBeGreaterThan(0);
    const hrefs = links.map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/mutual-aid');
    expect(hrefs).toContain('/food-security');
    for (const href of hrefs) {
      expect(href).toBeTruthy();
      expect(href).not.toContain('#');
    }
  });

  it('renders a 404 page for unknown routes', async () => {
    window.history.pushState({}, '', '/this-route-does-not-exist');
    render(<App />);
    expect(await screen.findByText('404')).toBeInTheDocument();
  });
});
