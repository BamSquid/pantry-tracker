import { Timestamp } from 'firebase/firestore';

export interface EntryValues {
    dateAdded: Timestamp;
    expirationDate: Timestamp;
    name: string;
    quantity: number;
}

export interface EntriesDocument {
    id: string;
    entries: EntryValues[];
}