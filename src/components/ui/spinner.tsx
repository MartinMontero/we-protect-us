import { cn } from '@/lib/utils';

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-32 w-32',
} as const;

export interface SpinnerProps {
  size?: keyof typeof sizeClasses;
  /** Override the border colour, e.g. "border-red-600". Defaults to border-primary. */
  className?: string;
}

/**
 * Accessible loading spinner. Replaces the dozens of inline
 * `animate-spin rounded-full ...` divs scattered across the app.
 */
export const Spinner = ({ size = 'md', className }: SpinnerProps) => (
  <div
    role="status"
    aria-live="polite"
    className={cn(
      'animate-spin rounded-full border-b-2 border-primary',
      sizeClasses[size],
      className,
    )}
  >
    <span className="sr-only">Loading…</span>
  </div>
);

/** Centered spinner for full-section loading states. */
export const LoadingState = ({ size = 'md', className }: SpinnerProps) => (
  <div className="flex items-center justify-center py-8">
    <Spinner size={size} className={className} />
  </div>
);
