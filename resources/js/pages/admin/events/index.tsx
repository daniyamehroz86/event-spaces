import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

import PaginationWrapper from '@/components/custom/PaginationWrapper';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface MainEvent {
    id: number;
    title: string;
    description: string;
}

interface PaginationLinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    mainEvents: {
        data: MainEvent[];
        current_page: number;
        last_page: number;
        links: PaginationLinkType[];
    };
}

export default function Index({ mainEvents }: Props) {
    const { delete: deleteRequest } = useForm();

    const handleDelete = (id: number) => {
        deleteRequest(route('events-destroy', id));
    };

    return (
        <AppLayout>
            <Head title="Main Events" />

            <div className="mx-5 rounded p-6 shadow">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Main Events</h2>
                    <Link href={route('events-create')}>
                        <Button>Add New</Button>
                    </Link>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mainEvents.data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell className="capitalize">{item.description}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={route('events.edit', item.id)}>
                                        <Button variant="outline" size="sm" className="mr-2">
                                            Edit
                                        </Button>
                                    </Link>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm">
                                                Delete
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will permanently delete <strong>{item.title}</strong>'s data. This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(item.id)}>Confirm Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <PaginationWrapper links={mainEvents.links} className="mt-6" />
            </div>
        </AppLayout>
    );
}
