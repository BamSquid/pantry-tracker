import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { type PantryTableValues } from '@src/types';
import { useEffect, useState, type ReactElement } from 'react';
import sortBy from 'lodash/sortBy';
import { ActionIcon, Box, Button, Card, Group, Text } from '@mantine/core';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import AddNewItemForm from '@components/AddNewItemForm/AddNewItemForm';
import '@styles/PantryTable.css';

const PantryTable = (props: {
    header: string;
    entries: PantryTableValues[];
    onUpdate: () => void;
}): ReactElement => {
    const { header, entries, onUpdate } = props;
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<PantryTableValues>>({
        columnAccessor: 'expirationDate',
        direction: 'asc',
    });
    const [records, setRecords] = useState(sortBy(entries, 'expirationDate'));

    useEffect(() => {
        const data = sortBy(entries, sortStatus.columnAccessor) as PantryTableValues[];
        setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus, entries]);

    const openModal = () => modals.open({
        title: 'Add New Item',
        children: <AddNewItemForm docName={header} />,
        centered: true,
        size: 'md',
        onClose: onUpdate
    });

    return (
        <Card withBorder shadow='sm' radius='md' px='xs'>
            <Card.Section withBorder inheritPadding py='xs'>
                <Text size='xl' fw={500}>
                    {header}
                </Text>
            </Card.Section>
            <Card.Section inheritPadding py='xs'>
                <DataTable
                    columns={[
                        {
                            accessor: 'name',
                            textAlign: 'left',
                            sortable: true
                        }, {
                            accessor: 'expirationDate',
                            sortable: true
                        }, {
                            accessor: 'quantity',
                            sortable: true
                        }, {
                            accessor: 'dateAdded',
                            sortable: true
                        }, {
                            accessor: 'actions',
                            title: <Box mr={6}>Actions</Box>,
                            textAlign: 'right',
                            width: '0%',
                            render: () => (
                                <Group gap={4} justify="right" wrap="nowrap">
                                    <ActionIcon
                                        size="sm"
                                        variant="subtle"
                                        color="blue"
                                        onClick={() => console.log('edit row')}
                                    >
                                        <IconEdit size={16} />
                                    </ActionIcon>
                                    <ActionIcon
                                        size="sm"
                                        variant="subtle"
                                        color="red"
                                    >
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                </Group>
                            ),
                        }]}
                    records={records}
                    withTableBorder
                    borderRadius='lg'
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    textSelectionDisabled
                    noRecordsText='No items have been added'
                    minHeight={150}
                />
            </Card.Section>
            <Card.Section inheritPadding py='sm'>
                <Button variant='outline' fullWidth onClick={openModal}>
                    <Group gap='xs'>
                        <IconPlus className='iconSpacing' size={16} color='blue' />
                        <Text>Add new item</Text>
                    </Group>
                </Button>
            </Card.Section>
        </Card>
    );
};

export default PantryTable;