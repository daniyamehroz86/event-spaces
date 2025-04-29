import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ auth }: any) {
const user = auth?.user;
return (
<AppLayout breadcrumbs={breadcrumbs}>

    <Head title="Dashboard" />

    {user.status === 'inactive' ? (
    <div className="m-4 rounded-lg bg-yellow-100 p-4 text-yellow-800">
        Your account is not active yet. Please wait for admin approval.
    </div>
    ) : (
        <div>
            <h1 className="m-4 rounded-lg bg-orange-100 p-4 text-yellow-800">
                Welcome: {user.name}
            </h1>
        </div>
    )}

</AppLayout>
);
}
