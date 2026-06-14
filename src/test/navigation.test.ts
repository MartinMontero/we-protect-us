import { describe, it, expect } from 'vitest';
import { featureNav, navGroups, dashboardNavItem } from '@/lib/navigation';

describe('navigation config', () => {
  it('every feature href is an absolute, unique path', () => {
    const hrefs = featureNav.map((i) => i.href);
    for (const href of hrefs) {
      expect(href.startsWith('/')).toBe(true);
      expect(href).not.toContain('#');
    }
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it('exposes at least one primary item for the top bar', () => {
    expect(featureNav.some((i) => i.primary)).toBe(true);
  });

  it('assigns every item to a known group', () => {
    for (const item of featureNav) {
      expect(navGroups).toContain(item.group);
    }
  });

  it('has a dashboard entry point', () => {
    expect(dashboardNavItem.href).toBe('/dashboard');
  });
});
