import { Timestamp } from 'firebase/firestore';

export interface EntryValues {
    dateAdded: Timestamp;
    expirationDate: Timestamp;
    name: string;
    quantity: number;
}

export interface EntriesDocument {
    entries: EntryValues[];
}