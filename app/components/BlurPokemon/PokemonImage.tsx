import Image from 'next/image';
import React from 'react';

interface PokemonImageProps {
    data: any;
}

export default function PokemonImage({ data }: PokemonImageProps) {
    return (
        <section className="flex flex-col items-center justify-center w-full h-96">
            <picture className="w-full flex items-center justify-center">
                <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data[0].img}.png`}
                    alt={data[0].name}
                    width={400}
                    height={400}
                    className=" blur-xl select-none"
                    draggable={false}
                    priority
                    unoptimized
                />
            </picture>
        </section>
    );
}
