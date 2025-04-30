import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface User {
  id: number;
  name: string;
  email: string;
  type: string;
  status: string;
}

interface PaginationLinkType {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  users: {
    data: User[];
    links: PaginationLinkType[];
  };
}

export default function Index({ users }: Props) {
  const { delete: deleteRequest } = useForm();

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteRequest(route('admin.users.destroy', id));
    }
  };

  return (
    <AppLayout>
      <Head title="Users" />

      <div className="mx-5 p-6 shadow rounded">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Users</h2>
          <Link href={route('admin.users.create')}>
            <Button>Add New</Button>
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell className="text-right">
                  <Link href={route('admin.users.edit', user.id)}>
                    <Button variant="outline" size="sm" className="mr-2">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {users.links.length > 3 && (
          <Pagination className="mt-6 justify-end">
            <PaginationContent>
              {users.links.map((link, index) => {
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
