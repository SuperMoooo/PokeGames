import Link from 'next/link';
import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full flex justify-center items-center flex-col p-4 gap-4 text-white z-10 mt-10 ">
            <Link
                href="https://github.com/SuperMoooo"
                target="_blank"
                className="hover:underline"
            >
                Github
            </Link>
            <h1 className="text-zinc-500 text-center">
                A big thanks to Nacho, a Pokémon Trainer who helped build this
                project.
            </h1>
        </footer>
    );
}
