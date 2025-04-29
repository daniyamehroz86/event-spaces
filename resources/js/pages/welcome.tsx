import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <header className="w-full border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                    <nav className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="text-xl font-semibold">
                            <Link href="/">MyApp</Link>
                        </div>

                        <div className="hidden md:flex gap-6">
                            <Link href="/about" className="hover:text-blue-600">About</Link>
                            <Link href="/services" className="hover:text-blue-600">Services</Link>
                            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
                        </div>

                        <div className="flex gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded px-4 py-1.5 border border-gray-300 hover:border-gray-400 dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded px-4 py-1.5 hover:underline"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded px-4 py-1.5 border border-gray-300 hover:border-gray-400 dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="flex-1 flex items-center justify-center p-8">
                    <h1 className="text-3xl font-bold">Welcome Page</h1>
                </main>
            </div>
        </>
    );
}
