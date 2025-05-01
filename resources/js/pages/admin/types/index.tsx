import React, { useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';


import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

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
  } from "@/components/ui/alert-dialog";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination'; // adjust path if needed

interface TypeItem {
  id: number;
  name: string;
  type: 'event' | 'venue' | 'facilities' | 'amenities';
  status: 'active' | 'inactive';
}

interface PaginationLinkType {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  types: {
    data: TypeItem[];
    current_page: number;
    last_page: number;
    links: PaginationLinkType[];
  };
}

export default function Index({ types }: Props) {

interface PageProps {
    flash?: {
        success?: string;
    };
    [key: string]: any; // 👈 This makes it compatible with Inertia's expected structure
    }

    // Use the generic to type `props`
    const { props } = usePage<PageProps>();

    useEffect(() => {

    if (props.flash?.success) {
        toast.success(props.flash.success);
    }
    }, [props.flash]);

  const { delete: deleteRequest } = useForm();

  const handleDelete = (id: number) => {
      deleteRequest(route('admin.types.destroy', id));
  };

  return (
    <AppLayout>
      <Head title="Types" />

      <div className="mx-5 p-6 shadow rounded">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Types</h2>
          <Link href={route('admin.types.create')}>
            <Button>Add New</Button>
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {types.data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="capitalize">{item.type}</TableCell>
                <TableCell className="capitalize">{item.status}</TableCell>
                <TableCell className="text-right">
                  <Link href={route('admin.types.edit', item.id)}>
                    <Button variant="outline" size="sm" className="mr-2">
                      Edit
                    </Button>
                  </Link>
                  <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete <strong>{item.name}</strong>'s account. This action cannot be undone.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id)}>
                                Confirm Delete
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {types.links.length > 3 && (
          <Pagination className="mt-6 ">
            <PaginationContent>
              {types.links.map((link, index) => {
                if (link.label.includes('Previous')) {
                  return link.url ? (
                    <PaginationItem key={index}>
                      <PaginationPrevious href={link.url} />
                    </PaginationItem>
                  ) : null;
                }

                if (link.label.includes('Next')) {
                  return link.url ? (
                    <PaginationItem key={index}>
                      <PaginationNext href={link.url} />
                    </PaginationItem>
                  ) : null;
                }

                if (link.label === '...') {
                  return (
                    <PaginationItem key={index}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href={link.url || '#'}
                      isActive={link.active}
                    >
                      {link.label}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </AppLayout>
  );
}
