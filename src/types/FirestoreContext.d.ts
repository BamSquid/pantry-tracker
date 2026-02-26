import { type DocumentData } from "firebase/firestore";

export interface FirestoreContextType {
  getDocument: <T>(collectionPath: string, id: string) => Promise<T | null>;
  getCollection: <T>(collectionPath: string) => Promise<T[]>;
  addDocument: <T extends DocumentData>(collectionPath: string, data: T) => Promise<string>;
  addDocumentWithId: <T extends DocumentData>(collectionPath: string, id: string, data: T) => Promise<void>;
  updateDocument: <T>(collectionPath: string, id: string, data: Partial<T>) => Promise<void>;
  deleteDocument: (collectionPath: string, id: string) => Promise<void>;
  getQuery: <T>(collectionPath: string, constraints: QueryConstraint[], useCollectionGroup?: boolean) => Promise<T[]>;
  listenQuery: <T>(
    collectionPath: string,
    constraints: QueryConstraint[],
    callback: (data: T[]) => void,
    useCollectionGroup?: boolean
  ) => Unsubscribe;
};