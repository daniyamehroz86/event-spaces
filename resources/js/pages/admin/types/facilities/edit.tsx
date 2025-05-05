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
import { toast } from 'sonner';

interface Props {
  type: {
    id: number;
    name: string;
    status: string;
  };
}

export default function EditType({ type }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: type.name,
    status: type.status,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route('admin.facilities.update', type.id), {
      onSuccess: () => toast.success('Facilities Type updated successfully!'),
      onError: () => toast.error('Failed to update Facilities Type.'),
    });
  };

  return (
    <AppLayout>
      <Head title={`Edit Facilities Type: ${type.name}`} />

      <div className="mx-5 p-6 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Edit Facilities Type</h2>

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
            {processing ? 'Updating...' : 'Update Facilities Type'}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
