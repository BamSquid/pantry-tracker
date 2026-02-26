import { Button, Checkbox, Flex, Group, LoadingOverlay, Stack, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useState, type ReactElement } from 'react';
import { modals } from '@mantine/modals';
import { useFirestore } from '@context/FirestoreContext/useFirestore';
import { useAuth } from '@context/AuthContext/useAuth';
import { arrayUnion } from 'firebase/firestore';

const AddNewItemForm = (props: {
    docName: string;
}): ReactElement => {
    const { docName } = props;
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = useAuth();
    const { updateDocument } = useFirestore();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            quantity: '',
            expirationDate: '',
            addAnotherItem: false
        },
        validate: {
            name: (value) => (value ? null : 'Name is required'),
            quantity: (value) => /^\d+$/.test(value) ? null : 'Quantity must be a number',
        },
    });

    const submitNewItem = async (values: typeof form.values) => {
        if (currentUser && currentUser.email) {
            setIsLoading(true);
            try {
                await updateDocument(`users/${currentUser.email}/pantries`, docName, {
                    entries: arrayUnion({
                        name: values.name,
                        quantity: values.quantity,
                        expirationDate: values.expirationDate,
                        dateAdded: new Date()
                    })
                });

                if (values.addAnotherItem) {
                    form.reset();
                    form.values.addAnotherItem = true;
                }
                else {
                    modals.closeAll();
                }
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <form onSubmit={form.onSubmit((values) => submitNewItem(values))}>
            <Flex justify='flex-end' direction='column'>
                <Stack>
                    <TextInput
                        withAsterisk
                        label='Name'
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                    />
                    <TextInput label='Quantity'
                        withAsterisk
                        key={form.key('quantity')}
                        {...form.getInputProps('quantity')}
                    />
                    <DateInput
                        label='Expiration date'
                        firstDayOfWeek={0}
                        key={form.key('expirationDate')}
                        {...form.getInputProps('expirationDate')}
                    />
                    <Group gap='xl' justify='space-between'>
                        <Checkbox
                            label='Add another item'
                            {...form.getInputProps('addAnotherItem')}
                        />
                        <Button type='submit'>
                            Submit
                        </Button>
                    </Group>
                </Stack>
            </Flex>
            <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        </form>
    );
};

export default AddNewItemForm;