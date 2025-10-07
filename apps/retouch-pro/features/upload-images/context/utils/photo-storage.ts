/* eslint-disable no-console */
import { Photo, UserData } from '../types';

const DB_NAME = 'RetouchProDB';
const DB_VERSION = 1;
const STORE_NAME = 'photos';
const STORAGE_KEY = 'retouchPro.photos';
const USER_DATA_KEY = 'retouchPro.userData';

export type StoredPhotoData = {
  id: string;
  name: string;
  type: string;
  size: number;
  width: number;
  height: number;
  dataUrl: string;
};

class PhotoStorage {
  private db: IDBDatabase | null = null;

  private async openDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  }

  async savePhotos(photos: Photo[]): Promise<void> {
    try {
      // Prepare photos data with dataUrl for IndexedDB storage
      const photosData = await Promise.all(
        photos.map(async photo => {
          const dataUrl = await new Promise<string>(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(photo.file);
          });

          return {
            id: photo.id,
            name: photo.name,
            type: photo.type,
            size: photo.size,
            width: photo.width,
            height: photo.height,
            dataUrl,
          };
        }),
      );

      // Save to IndexedDB
      const db = await this.openDB();

      // Clear existing photos first
      const clearTransaction = db.transaction([STORE_NAME], 'readwrite');
      const clearStore = clearTransaction.objectStore(STORE_NAME);
      await new Promise<void>((resolve, reject) => {
        const clearRequest = clearStore.clear();
        clearRequest.onsuccess = () => resolve();
        clearRequest.onerror = () => reject(clearRequest.error);
      });

      // Add photos one by one to avoid transaction timeout
      for (const photoData of photosData) {
        const addTransaction = db.transaction([STORE_NAME], 'readwrite');
        const addStore = addTransaction.objectStore(STORE_NAME);

        await new Promise<void>((resolve, reject) => {
          const addRequest = addStore.add(photoData);
          addRequest.onsuccess = () => resolve();
          addRequest.onerror = () => reject(addRequest.error);
        });
      }

      // Only save to IndexedDB, no sessionStorage fallback to avoid quota issues
    } catch (error) {
      console.error('Failed to save photos to IndexedDB:', error);
      throw error;
    }
  }

  async loadPhotos(): Promise<Photo[]> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      return new Promise((resolve, reject) => {
        request.onerror = () => reject(request.error);
        request.onsuccess = async () => {
          const photosData = request.result as StoredPhotoData[];
          const photos: Photo[] = [];

          for (const photoData of photosData) {
            // Skip pending upload data
            if (photoData.type === 'pending-upload') {
              continue;
            }

            try {
              const response = await fetch(photoData.dataUrl);
              const blob = await response.blob();
              const file = new File([blob], photoData.name, {
                type: photoData.type,
              });

              photos.push({
                id: photoData.id,
                file,
                preview: photoData.dataUrl,
                name: photoData.name,
                size: photoData.size,
                type: photoData.type,
                width: photoData.width,
                height: photoData.height,
              });
            } catch {
              // Skip invalid photos
              continue;
            }
          }

          resolve(photos);
        };
      });
    } catch (error) {
      console.error('Failed to load photos from IndexedDB:', error);
      return [];
    }
  }

  async clearPhotos(): Promise<void> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      await store.clear();
    } catch {
      // Ignore errors
    }

    // Also clear sessionStorage
    sessionStorage.removeItem(STORAGE_KEY);
  }

  async saveUserData(userData: UserData): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch {
      // Silently fail if storage is full
    }
  }

  async loadUserData(): Promise<UserData | null> {
    if (typeof window === 'undefined') return null;

    try {
      const storedUserData = sessionStorage.getItem(USER_DATA_KEY);
      if (!storedUserData) return null;

      return JSON.parse(storedUserData) as UserData;
    } catch {
      return null;
    }
  }

  async clearUserData(): Promise<void> {
    if (typeof window === 'undefined') return;

    sessionStorage.removeItem(USER_DATA_KEY);
  }
}

export const photoStorage = new PhotoStorage();
