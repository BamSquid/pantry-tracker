import { getFirestore, doc, getDoc, collection, addDoc } from 'firebase/firestore';

export const migrateEntries = async (userEmail: string, pantryName: string) => {
  const db = getFirestore();
  const oldEntriesDoc = doc(db, 'users', userEmail, 'pantries', pantryName);
  const snapshot = await getDoc(oldEntriesDoc);

  if (!snapshot.exists()) return;

  const { entries } = snapshot.data();
  const newEntriesCollection = collection(db, 'users', userEmail, 'pantries', pantryName, 'entries');

  for (const entry of entries) {
    await addDoc(newEntriesCollection, entry);
  }

  console.log("Migration complete");
};