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
  type: 'venue';  // Changed to 'venue' for Venue Types only
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

  // Debugging: Log the props to check if flash data is coming through
  useEffect(() => {
    console.log("Page props:", props); // Logs props to see if 'flash' data is passed correctly
    if (props.flash?.success) {
      toast.success(props.flash.success);
    }
  }, [props.flash]);

  console.log("Types data:", types); // Log the 'types' prop to ensure data is passed properly

  const { delete: deleteRequest } = useForm();

  const handleDelete = (id: number) => {
    console.log("Deleting venue type with ID:", id);  // Debugging: Logs the ID of the item being deleted
    deleteRequest(route('admin.venue.destroy', id)); // Adjusted to venueTypes destroy route
  };

  return (
    <AppLayout>
      <Head title="Venue Types" />  {/* Updated to Venue Types */}

      <div className="mx-5 p-6 shadow rounded">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Venue Types</h2> {/* Updated heading */}
          <Link href={route('admin.venue.create')}>  {/* Adjusted to venueTypes route */}
            <Button>Add New Venue Type</Button>  {/* Updated button text */}
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {types.data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="capitalize">{item.status}</TableCell>  {/* Status display */}
                <TableCell className="text-right">
                  <Link href={route('admin.venue.edit', item.id)}>  {/* Adjusted to venueTypes edit route */}
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
                          This will permanently delete <strong>{item.name}</strong>'s Venue Type. This action cannot be undone.
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
          <Pagination className="mt-6">
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
