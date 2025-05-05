import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, type User } from 'firebase/auth';
import { createContext, type FC, ReactNode, useContext, useEffect, useState} from 'react';
import type { AuthContextType } from '@types';
import { auth } from '@src/firebaseConfig'

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, [auth]);

    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    };

    const updateProfile = (profile: { displayName?: string}): any => {
        if (currentUser) {
            return updateProfile(profile);
        }
        return Promise.reject('No user is currently signed in');
    }

    return (
        <AuthContext.Provider value={{ currentUser, signUp, logIn, logOut, updateProfile}}>
            {children}
        </AuthContext.Provider>
    );
};
