
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface OfflineData {
  checkins: Array<{
    data: any;
    token: string;
    timestamp: number;
  }>;
  reports: Array<{
    data: any;
    token: string;
    timestamp: number;
  }>;
}

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasOfflineData, setHasOfflineData] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Connection Restored",
        description: "Syncing offline data...",
      });
      
      // Trigger background sync
      if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        navigator.serviceWorker.ready.then(registration => {
          return registration.sync.register('background-sync');
        });
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Connection Lost",
        description: "App will continue to work offline. Data will sync when connection is restored.",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check for existing offline data
    checkOfflineData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const checkOfflineData = async () => {
    try {
      const cache = await caches.open('emergency-prep-v1');
      const offlineData = await cache.match('/offline-data');
      setHasOfflineData(!!offlineData);
    } catch (error) {
      console.error('Error checking offline data:', error);
    }
  };

  const storeOfflineData = async (type: 'checkin' | 'report', data: any, token: string) => {
    if (isOnline) {
      return; // Don't store if online
    }

    try {
      const cache = await caches.open('emergency-prep-v1');
      
      // Get existing offline data
      let offlineData: OfflineData = { checkins: [], reports: [] };
      const existingData = await cache.match('/offline-data');
      if (existingData) {
        offlineData = await existingData.json();
      }

      // Add new data
      const entry = { data, token, timestamp: Date.now() };
      if (type === 'checkin') {
        offlineData.checkins.push(entry);
      } else {
        offlineData.reports.push(entry);
      }

      // Store updated data
      const response = new Response(JSON.stringify(offlineData), {
        headers: { 'Content-Type': 'application/json' }
      });
      await cache.put('/offline-data', response);
      
      setHasOfflineData(true);
      
      toast({
        title: "Data Stored Offline",
        description: "Your submission will be synced when connection is restored.",
      });
    } catch (error) {
      console.error('Error storing offline data:', error);
      toast({
        title: "Error",
        description: "Failed to store data offline",
        variant: "destructive",
      });
    }
  };

  return {
    isOnline,
    hasOfflineData,
    storeOfflineData,
    checkOfflineData
  };
};
