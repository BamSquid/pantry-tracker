import { useAuth } from '@context/AuthContext/useAuth';
import { useFirestore } from '@context/FirestoreContext/useFirestore';
import { Button, Flex, Group, LoadingOverlay, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useState, type ReactElement } from 'react';

const AddNewPantryForm = (): ReactElement => {
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = useAuth();
    const { addDocumentWithId } = useFirestore();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: ''
        },
        validate: {
            name: (value) => (value ? null : 'Name is required')
        },
    });

    const submitNewPantry = async (values: typeof form.values) => {
        if (currentUser && currentUser.email) {
            setIsLoading(true);
            try {
                const collection = `users/${currentUser.email}/pantries`;
                await addDocumentWithId(collection, values.name, { entries: [] });
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        modals.closeAll();
    }

    return (
        <form onSubmit={form.onSubmit((values) => submitNewPantry(values))}>
            <Flex justify='flex-end' direction='column'>
                <Stack>
                    <TextInput
                        withAsterisk
                        label='Name'
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                    />
                    <Button type='submit'>
                        Submit
                    </Button>
                </Stack>
            </Flex>
            <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        </form>
    )
}

export default AddNewPantryForm;