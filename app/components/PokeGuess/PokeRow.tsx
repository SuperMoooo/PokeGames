import { firstCharToUpperCase } from '@/app/lib/hooks';
import Image from 'next/image';
import React from 'react';

interface PokeRowProps {
    row: any[];
}

export default function PokeRow({ row }: PokeRowProps) {
    return (
        <div className="flex items-center justify-center gap-4 *:text-xl *:border-4 *:rounded-lg *:border-black  *:w-32 *:h-32 *:flex *:justify-center *:items-center *:opacity-0 *:text-center">
            <picture
                title={row[1].name}
                className="revealCard1 pokedexBorder relative w-full h-full "
            >
                <Image
                    src={row[0].img}
                    alt={row[1].name}
                    width={100}
                    height={100}
                    unoptimized
                />
                <span className="bgPokedex absolute w-[5.76rem] h-[5.7rem] top-[-11px] left-[-7px] z-[-50]"></span>
            </picture>
            <div
                className={`revealCard2 ${
                    row[1].value === 'green' ? 'bg-green-600' : 'bg-red-600'
                }`}
            >
                <h1>{firstCharToUpperCase(row[1].name)}</h1>
            </div>
            <div
                className={`revealCard3 ${
                    row[2].value === 'green' ? 'bg-green-600' : 'bg-red-600'
                }`}
            >
                <h1>{firstCharToUpperCase(row[2].gen).toLocaleUpperCase()}</h1>
            </div>
            <div
                className={`revealCard4 ${
                    row[3].value === 'green' ? 'bg-green-600' : 'bg-red-600'
                }`}
            >
                <h1>{firstCharToUpperCase(row[3].type1)}</h1>
            </div>
            <div
                className={`revealCard5 ${
                    row[4]?.value === 'green' ? 'bg-green-600' : 'bg-red-600'
                }`}
            >
                <h1>
                    {row[4]?.type2
                        ? firstCharToUpperCase(row[4]?.type2)
                        : 'None'}
                </h1>
            </div>
            <div
                className={`revealCard6 ${
                    row[5].value === 'green' ? 'bg-green-600' : 'bg-red-600'
                }`}
            >
                <h1>{firstCharToUpperCase(row[5].color)}</h1>
            </div>
            <div
                className={`revealCard7  ${
                    row[6].value === 'green' ? 'bg-green-600' : 'bg-red-600'
                }`}
            >
                <h1>{firstCharToUpperCase(row[6].habitat)}</h1>
            </div>
        </div>
    );
}
