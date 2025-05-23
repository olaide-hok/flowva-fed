import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {APP_DESCRIPTION, APP_NAME, SERVER_URL} from '@/lib/constants';
import {AuthProviders} from '@/components/shared/providers';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: {
        template: `%s | Flowva - Welcome`,
        default: APP_NAME,
    },
    description: APP_DESCRIPTION,
    metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <AuthProviders>{children}</AuthProviders>
            </body>
        </html>
    );
}
