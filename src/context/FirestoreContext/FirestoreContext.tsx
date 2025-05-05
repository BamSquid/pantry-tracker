import React, { createContext, useContext, type FC } from 'react';
import {  collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, CollectionReference, type DocumentData } from 'firebase/firestore';
import { db } from '@src/firebaseConfig';
import type { FirestoreContextType } from '@types';

export const FirestoreContext = createContext<FirestoreContextType | undefined>(undefined);

export const FirestoreProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

  const getDocument = async <T,>(collectionPath: string, id: string): Promise<T | null> => {
    const docRef = doc(db, collectionPath, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as T;
    }
    return null;
  };

  const getCollection = async <T,>(collectionPath: string): Promise<T[]> => {
    const colRef = collection(db, collectionPath);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  };

  const addDocument = async <T extends DocumentData>(collectionPath: string, data: T): Promise<string> => {
    const colRef: CollectionReference<DocumentData> = collection(db, collectionPath);
    const docRef = await addDoc(colRef, data);
    return docRef.id;
  };

  const updateDocument = async <T,>(collectionPath: string, id: string, data: Partial<T>): Promise<void> => {
    const docRef = doc(db, collectionPath, id);
    await updateDoc(docRef, data);
  };

  const deleteDocument = async (collectionPath: string, id: string): Promise<void> => {
    const docRef = doc(db, collectionPath, id);
    await deleteDoc(docRef);
  };

  return (
    <FirestoreContext.Provider value={{ getDocument, getCollection, addDocument, updateDocument, deleteDocument }}>
      {children}
    </FirestoreContext.Provider>
  );
};
