import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type {
  RealtimeChannel,
  RealtimePostgresChangesPayload,
} from '@supabase/supabase-js';

type ChangePayload = RealtimePostgresChangesPayload<Record<string, unknown>>;

interface UseRealtimeOptions {
  table: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string;
  onInsert?: (payload: ChangePayload) => void;
  onUpdate?: (payload: ChangePayload) => void;
  onDelete?: (payload: ChangePayload) => void;
  onGeneric?: (payload: ChangePayload) => void;
}

export const useRealtime = ({
  table,
  event = '*',
  filter,
  onInsert,
  onUpdate,
  onDelete,
  onGeneric,
}: UseRealtimeOptions) => {
  const channelRef = useRef<RealtimeChannel | null>(null);

  // Keep the latest handlers in a ref so passing inline callbacks does NOT
  // tear down and recreate the subscription on every render.
  const handlersRef = useRef({ onInsert, onUpdate, onDelete, onGeneric });
  handlersRef.current = { onInsert, onUpdate, onDelete, onGeneric };

  useEffect(() => {
    const channelName = `${table}_${event}_${filter || 'all'}`;

    channelRef.current = supabase
      .channel(channelName)
      .on<Record<string, unknown>>(
        // The dynamic event/table here doesn't match a single literal overload,
        // so the filter object is asserted to the expected shape (no `any`).
        'postgres_changes',
        { event, schema: 'public', table, filter } as {
          event: '*';
          schema: string;
          table: string;
          filter?: string;
        },
        (payload) => {
          const h = handlersRef.current;
          switch (payload.eventType) {
            case 'INSERT':
              h.onInsert?.(payload);
              break;
            case 'UPDATE':
              h.onUpdate?.(payload);
              break;
            case 'DELETE':
              h.onDelete?.(payload);
              break;
            default:
              h.onGeneric?.(payload);
          }
        },
      )
      .subscribe();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [table, event, filter]);

  const unsubscribe = useCallback(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
  }, []);

  return { unsubscribe };
};
