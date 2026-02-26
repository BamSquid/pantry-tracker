import { useAuth } from "@context/AuthContext/useAuth";
import { Button, Group, LoadingOverlay, Stack, Text } from "@mantine/core";
import { useFirestore } from "@context/FirestoreContext/useFirestore";
import { useEffect, useState, type ReactElement } from "react";
import type { EntriesDocument, EntryValues } from "@types";
import PantryTable from "@components/PantryTable/PantryTable";
import { modals } from "@mantine/modals";
import AddNewPantryForm from "@components/AddNewPantryForm/AddNewPantryForm";
import { IconTablePlus } from '@tabler/icons-react';

const Home = (): ReactElement => {
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<EntriesDocument[] | undefined>(undefined);
    const [pantries, setPantries] = useState<ReactElement[]>([]);
    const { getCollection, getDocument } = useFirestore();

    useEffect(() => {
        getPantries();
    }, [currentUser]);

    useEffect(() => {
        if (data && data.length > 0) {
            const pantryData: ReactElement[] = [];
            data.forEach(async (pantry) => {
                const entries = await getCollection<EntryValues>(`users/${currentUser?.email}/pantries/${pantry.id}/entries`);
                const formattedData = entries.map((entry) => ({
                    ...entry,
                    dateAdded: entry.dateAdded.toDate().toLocaleDateString(),
                    expirationDate: entry.expirationDate.toDate().toLocaleDateString()
                }));
                pantryData.push(<PantryTable header={pantry.id} entries={formattedData} onUpdate={getPantries} key={pantry.id}/>);
            });
            setPantries(pantryData);
        }
    }, [data]);

    const getPantries = async () => {
        if (currentUser && currentUser.email) {
            setIsLoading(true);
            try {
                const collection = `users/${currentUser.email}/pantries`;
                const data = await getCollection<EntriesDocument>(collection);
                setData(data ?? []);
            }
            catch (error) {
                console.error('Error fetching data', error);
            }
            finally {
                setIsLoading(false);
            }
        }
    };

    const openModal = () => modals.open({
        title: 'Add new pantry',
        children: <AddNewPantryForm />,
        centered: true,
        size: 'md',
        onClose: getPantries
    });

    return (
        <div>
            {currentUser ? (
                <div>
                    <h1>Welcome, {currentUser.displayName || currentUser.email}</h1>
                    {pantries.length === 0 ?
                        <>
                            <Text>
                                It looks like you don't have any pantries set up yet. Please click the button to start.
                            </Text>
                            <Button variant='outline' onClick={openModal}>
                                <Group gap='xs'>
                                    <IconTablePlus size={16} color='white' />
                                    <Text>Add new collection</Text>
                                </Group>
                            </Button>
                        </> :
                        <Stack>
                            {pantries}
                            <Button variant='filled' onClick={openModal}>
                                <Group gap='xs'>
                                    <IconTablePlus size={16} color='white' />
                                    <Text>Add new collection</Text>
                                </Group>
                            </Button>
                        </Stack>
                    }
                    <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                </div>
            ) : (
                <div>
                    <p>Please create an account, or log in to view your profile</p>
                </div>
            )}
        </div>
    );
};

export default Home;