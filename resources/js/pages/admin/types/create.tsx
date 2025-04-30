import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function CreateType() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    type: 'event',
    status: 'active',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('admin.types.store'));
  };

  return (
    <AppLayout>
      <Head title="Create Type" />

      <div className="mx-5 p-6  rounded">
        <h2 className="text-xl font-bold mb-4">Create New Type</h2>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
          </div>

          <div>
            <Label htmlFor="type">Type</Label>
            <Select
              value={data.type}
              onValueChange={(value) => setData('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="venue">Venue</SelectItem>
                <SelectItem value="facilities">Facilities</SelectItem>
                <SelectItem value="amenities">Amenities</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <div className="text-red-500 text-sm">{errors.type}</div>}
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={data.status}
              onValueChange={(value) => setData('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
          </div>

          <Button type="submit" disabled={processing}>
            Create Type
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
