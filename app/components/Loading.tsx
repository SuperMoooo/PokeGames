import React from 'react';
import Bg from './Bg';
import Image from 'next/image';
export default function Loading() {
    return (
        <main className="w-full min-h-[100dvh] flex items-center justify-center">
            <Bg />
            <picture className="w-full h-full flex flex-col gap-6 items-center justify-center ">
                <Image
                    src="/loadingGIF.gif"
                    alt="loading..."
                    width={200}
                    height={200}
                    className="z-20 opacity-40"
                    objectFit="cover"
                    unoptimized
                />
                <h1 className="text-4xl z-20 opacity-70">Loading...</h1>
            </picture>
        </main>
    );
}
