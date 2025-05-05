import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext/useAuth";
import { Button, LoadingOverlay } from "@mantine/core";
import { useFirestore } from "@context/FirestoreContext/useFirestore";
import { useEffect, useState } from "react";
import type { EntriesDocument, EntryValues } from "@types";

const Home = () => {
    const {currentUser, logOut} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<EntryValues[] | null>(null);
    const {getDocument} = useFirestore();
    const navigate = useNavigate();

    useEffect(() => {
        const getPantries = async () => {
            setIsLoading(true);
            try {
                const collection = `users/${currentUser?.email}/pantries`;
                const data = await getDocument<EntriesDocument>(collection, 'basement');
                setData(data?.entries ?? []);
            }
            catch (error) {
                console.error('Error fetching data', error);
            }
            finally {
                setIsLoading(false);
            }
        };

        getPantries();
    }, [currentUser, getDocument]);

    const navigateToPage = (page: string) => {
        navigate(`/${page}`);
    };

    return (
        <div>
            {currentUser ? (
                <div>
                    <h1>Welcome, {currentUser.displayName || currentUser.email}</h1>
                    {data !== null && data.length === 0 ? 
                        <Button>Create something new</Button> :
                        <div>
                            {data?.map((entry, index) => (
                                <li key={index}>
                                    {`${entry.name} added on ${entry.dateAdded.toDate().toLocaleDateString()}, ${entry.quantity} to expire on ${entry.expirationDate.toDate().toLocaleDateString()}`}
                                </li>
                            ))}
                        </div>
                    }
                    <Button onClick={logOut}>Log out</Button>
                    <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                </div>
            ): (
                <div>
                    <p>Please log in to see your profile, or create an account</p>
                    <Button onClick={() => navigateToPage('login')}>Log in</Button>
                    <Button onClick={() => navigateToPage('signup')}>Sign up</Button>
                </div>
            )}
        </div>
    );
};

export default Home;