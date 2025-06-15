
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Extend ServiceWorkerRegistration interface to include sync
interface ServiceWorkerRegistrationWithSync extends ServiceWorkerRegistration {
  sync?: {
    register: (tag: string) => Promise<void>;
  };
}

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
      
      // Trigger background sync if supported
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
          const syncRegistration = registration as ServiceWorkerRegistrationWithSync;
          if (syncRegistration.sync) {
            return syncRegistration.sync.register('background-sync');
          } else {
            console.log('Background sync not supported');
            // Fallback: trigger manual sync
            syncOfflineData();
          }
        }).catch(error => {
          console.error('Background sync registration failed:', error);
          syncOfflineData();
        });
      } else {
        // Fallback for browsers without service worker support
        syncOfflineData();
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

  const syncOfflineData = async () => {
    try {
      const cache = await caches.open('emergency-prep-v1');
      const offlineData = await cache.match('/offline-data');
      
      if (offlineData) {
        const data: OfflineData = await offlineData.json();
        
        // Sync safety check-ins
        for (const checkin of data.checkins) {
          try {
            const response = await fetch('/rest/v1/safety_checkins', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${checkin.token}`
              },
              body: JSON.stringify(checkin.data)
            });
            
            if (!response.ok) {
              throw new Error('Failed to sync checkin');
            }
          } catch (error) {
            console.error('Error syncing checkin:', error);
          }
        }
        
        // Sync damage reports
        for (const report of data.reports) {
          try {
            const response = await fetch('/rest/v1/damage_reports', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${report.token}`
              },
              body: JSON.stringify(report.data)
            });
            
            if (!response.ok) {
              throw new Error('Failed to sync damage report');
            }
          } catch (error) {
            console.error('Error syncing damage report:', error);
          }
        }
        
        // Clear offline data after successful sync
        await cache.delete('/offline-data');
        setHasOfflineData(false);
        
        toast({
          title: "Offline Data Synced",
          description: "Your offline submissions have been successfully synced.",
        });
      }
    } catch (error) {
      console.error('Manual sync failed:', error);
      toast({
        title: "Sync Error",
        description: "Failed to sync offline data. Will retry when connection improves.",
        variant: "destructive",
      });
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
    checkOfflineData,
    syncOfflineData
  };
};
