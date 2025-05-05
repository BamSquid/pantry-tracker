import { type UserCredential, type User } from 'firebase/auth'

export interface AuthContextType {
    currentUser: User | null;
    signUp: (email: string, password: string) => Promise<UserCredential>;
    logIn: (email: string, password: string) => Promise<UserCredential>;
    logOut: () => Promise<void>;
    updateProfile: (profile: {displayName?: string}) => Promise<void>;
}