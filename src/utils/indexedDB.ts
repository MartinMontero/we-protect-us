
interface CSFDatabase {
  communities: Community[];
  members: Member[];
  mutualAid: MutualAidRequest[];
  trustNetwork: TrustRelation[];
}

interface Community {
  id: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  memberCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Member {
  id: string;
  pseudonym: string;
  communityIds: string[];
  trustScore: number;
  joinedAt: Date;
  lastActive: Date;
}

interface MutualAidRequest {
  id: string;
  type: 'offer' | 'request';
  title: string;
  description: string;
  category: string;
  memberId: string;
  communityId: string;
  status: 'active' | 'fulfilled' | 'expired';
  createdAt: Date;
  updatedAt: Date;
}

interface TrustRelation {
  id: string;
  fromMemberId: string;
  toMemberId: string;
  trustLevel: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
}

class CSFIndexedDB {
  private dbName = 'csf-local-data';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains('communities')) {
          const communityStore = db.createObjectStore('communities', { keyPath: 'id' });
          communityStore.createIndex('location', ['location.lat', 'location.lng']);
        }

        if (!db.objectStoreNames.contains('members')) {
          const memberStore = db.createObjectStore('members', { keyPath: 'id' });
          memberStore.createIndex('trustScore', 'trustScore');
        }

        if (!db.objectStoreNames.contains('mutualAid')) {
          const aidStore = db.createObjectStore('mutualAid', { keyPath: 'id' });
          aidStore.createIndex('communityId', 'communityId');
          aidStore.createIndex('status', 'status');
        }

        if (!db.objectStoreNames.contains('trustNetwork')) {
          const trustStore = db.createObjectStore('trustNetwork', { keyPath: 'id' });
          trustStore.createIndex('fromMemberId', 'fromMemberId');
          trustStore.createIndex('toMemberId', 'toMemberId');
        }
      };
    });
  }

  async add<T extends keyof CSFDatabase>(
    storeName: T,
    data: CSFDatabase[T][0]
  ): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAll<T extends keyof CSFDatabase>(
    storeName: T
  ): Promise<CSFDatabase[T]> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async get<T extends keyof CSFDatabase>(
    storeName: T,
    id: string
  ): Promise<CSFDatabase[T][0] | undefined> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async update<T extends keyof CSFDatabase>(
    storeName: T,
    data: CSFDatabase[T][0]
  ): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async delete<T extends keyof CSFDatabase>(
    storeName: T,
    id: string
  ): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

export const csfDB = new CSFIndexedDB();
export type { Community, Member, MutualAidRequest, TrustRelation };
