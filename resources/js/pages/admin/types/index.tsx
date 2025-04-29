import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface TypeItem {
  id: number;
  name: string;
  type: 'event' | 'venue' | 'facilities' | 'amenities';
  status: 'active' | 'inactive';
}

interface Props {
  types: TypeItem[];
}

export default function Index({ types }: Props) {
  const { delete: deleteRequest } = useForm();

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this type?')) {
      deleteRequest(route('admin.types.destroy', id));
    }
  };

  return (
    <AppLayout>
      <Head title="Types" />

      <div className="mx-5 p-6 bg-white shadow rounded">
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
            {types.map((item) => (
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
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
}
