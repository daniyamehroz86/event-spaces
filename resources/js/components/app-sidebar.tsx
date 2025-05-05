import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { type NavItem, type SharedData , SubMainNavItem ,MainNavItem } from '@/types'; // 👈 Import SharedData
import { usePage, Link } from '@inertiajs/react';
import { LayoutGrid, Users, ListTree } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { props } = usePage<SharedData>(); // ✅ Correctly type `usePage`
    const user = props.auth.user;

    const mainNavItems: MainNavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
            subItems: [
                {
                  title: 'Dashboard',
                  href: '/dashboard',

                },
              ]
        },
        ...(user?.type === 'admin'
            ? [
                  {
                      title: 'Users',
                      href: '/admin/users',
                      icon: Users,
                      subItems: [
                        {
                          title: 'All Users',
                          href: '/admin/users',

                        },
                      ]
                  },
                  {
                    title: 'Types',
                    href: '/admin/types',
                    icon: ListTree,
                    subItems: [
                      {
                        title: 'Venue Type',  // Updated to Venue Type
                        href: '/admin/venue',  // Adjusted to reflect venueTypes route
                      },
                      {
                        title: 'Event Type',  // Optionally keep this if you still want the Event Type section
                        href: '/admin/event',  // Adjusted if Event Types are still needed
                      },
                      {
                        title: 'Facilities Type',  // Optionally keep this if you still want the Event Type section
                        href: '/admin/facilities',  // Adjusted if Event Types are still needed
                      },{
                        title: 'Amenities Type',  // Optionally keep this if you still want the Event Type section
                        href: '/admin/amenities',  // Adjusted if Event Types are still needed
                      },
                      // Add more subItems if needed for other types like facilities or amenities
                    ]
                  },
                  {
                    title: 'Event',
                    href: 'stepper',
                    icon: Users,
                    subItems: [
                      {
                        title: 'Add New',
                        href: '/stepper',

                      },
                    ]
                },

              ]
            : []),
    ];


    const footerNavItems: NavItem[] = [
        // {
        //     title: 'Repository',
        //     href: 'https://github.com/laravel/react-starter-kit',
        //     icon: Folder,
        // },
        // {
        //     title: 'Documentation',
        //     href: 'https://laravel.com/docs/starter-kits',
        //     icon: BookOpen,
        // },
    ];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={[]} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
