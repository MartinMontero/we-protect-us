import { useEffect, useRef } from 'react';
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
          switch (payload.eventType) {
            case 'INSERT':
              onInsert?.(payload);
              break;
            case 'UPDATE':
              onUpdate?.(payload);
              break;
            case 'DELETE':
              onDelete?.(payload);
              break;
            default:
              onGeneric?.(payload);
          }
        },
      )
      .subscribe();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [table, event, filter, onInsert, onUpdate, onDelete, onGeneric]);

  const unsubscribe = () => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
  };

  return { unsubscribe };
};
