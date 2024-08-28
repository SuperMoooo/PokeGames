import { firstCharToUpperCase } from '@/app/lib/hooks';
import Image from 'next/image';
import React from 'react';

interface PokemonsTriesProps {
    rowsPokemon: any;
}

export default function PokemonsTries({ rowsPokemon }: PokemonsTriesProps) {
    return (
        <div className="flex items-center justify-end h-full gap-4 flex-col-reverse  ">
            {rowsPokemon.map((row: any, index: number) => {
                return (
                    <div
                        key={index + row[1].name}
                        className="flex items-center justify-center gap-4 *:text-xl *:border-4 *:rounded-lg *:border-black  *:w-32 *:h-32 *:flex *:justify-center *:items-center *:opacity-0 *:text-center"
                    >
                        <picture
                            title={row[1].name}
                            className="revealCard1 pokedexBorder relative w-full h-full "
                        >
                            <Image
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${row[0]?.img}.png`}
                                alt={row[1].name}
                                width={100}
                                height={100}
                                unoptimized
                            />
                            <span className="bgPokedex absolute w-[5.76rem] h-[5.7rem] top-[-11px] left-[-7px] z-[-50]"></span>
                        </picture>
                        <div
                            className={`revealCard2 ${
                                row[1].value === 'green'
                                    ? 'bg-green-600'
                                    : 'bg-red-600'
                            }`}
                        >
                            <h1>{firstCharToUpperCase(row[1].name)}</h1>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
