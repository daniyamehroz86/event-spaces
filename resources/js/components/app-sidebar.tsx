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
import { type NavItem, type SharedData } from '@/types'; // 👈 Import SharedData
import { usePage, Link } from '@inertiajs/react';
import { LayoutGrid, Users, ListTree } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { props } = usePage<SharedData>(); // ✅ Correctly type `usePage`
    const user = props.auth.user;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        ...(user?.type === 'admin'
            ? [
                  {
                      title: 'Users',
                      href: '/admin/users',
                      icon: Users,
                  },
                  {
                      title: 'Types',
                      href: '/admin/types',
                      icon: ListTree,
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
