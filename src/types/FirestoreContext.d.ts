import { type DocumentData } from "firebase/firestore";

export interface FirestoreContextType {
  getDocument: <T>(collectionPath: string, id: string) => Promise<T | null>;
  getCollection: <T>(collectionPath: string) => Promise<T[]>;
  addDocument: <T extends DocumentData>(collectionPath: string, data: T) => Promise<string>;
  updateDocument: <T>(collectionPath: string, id: string, data: Partial<T>) => Promise<void>;
  deleteDocument: (collectionPath: string, id: string) => Promise<void>;
};