import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import ClientProvider from './components/ClientProvider';
import { Analytics } from '@vercel/analytics/react';
const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'PokéGames',
    description: 'Games for Pokémon fans',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={raleway.className}>
                <ClientProvider>{children}</ClientProvider>~
                <Analytics />
            </body>
        </html>
    );
}
