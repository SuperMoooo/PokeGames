import Link from 'next/link';
import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full flex justify-center items-center p-4 text-white z-10 mt-10">
            <Link href="https://github.com/SuperMoooo" target="_blank">
                Github
            </Link>
        </footer>
    );
}
