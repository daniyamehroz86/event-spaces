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

export default function CreateType() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    status: 'active', // Default status
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('admin.facilities.store'), {
      onSuccess: () => {
        toast.success('Facilities Type created successfully!');
      },
      onError: () => {
        toast.error('There was an error creating the Facilities Type.');
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Create Facilities Type" />

      <div className="mx-5 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Create New Facilities Type</h2>

        <form onSubmit={submit} className="space-y-4">
          {/* Name Field */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="mt-2"
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
          </div>

          {/* Status Field */}
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

          {/* Submit Button */}
          <div>
            <Button type="submit" disabled={processing} className="w-full">
              {processing ? 'Creating...' : 'Create Facilities Type'}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
