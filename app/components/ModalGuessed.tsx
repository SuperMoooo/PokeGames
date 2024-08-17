import Image from 'next/image';
import React from 'react';
import { firstCharToUpperCase } from '../lib/hooks';
import Link from 'next/link';
import { GAMEMODES } from '../lib/constants';

interface ModalProps {
    pokeImg: string;
    pokemonName: string;
    gameEnded: boolean;
    restartGame: () => void;
}

export default function ModalGuessed({
    pokeImg,
    pokemonName,
    gameEnded,
    restartGame,
}: ModalProps) {
    return (
        <main
            className={`absolute top-0 left-0 w-full h-full bg-black/50  items-center justify-center z-30 ${
                gameEnded ? 'flex' : 'hidden'
            }`}
        >
            <section className="z-50 rounded-lg bg-zinc-700 py-10 px-20 grid grid-cols-[1fr] gap-4">
                <picture className="flex items-center justify-center flex-col gap-5">
                    <h1 className="text-center text-6xl">Gongratulations!!!</h1>
                    <Image
                        src={pokeImg}
                        alt={pokemonName}
                        width={400}
                        height={400}
                    />
                </picture>
                <div className="flex items-center justify-center flex-col  gap-8">
                    <h2 className="text-4xl">
                        It's{' '}
                        <span className="font-bold">
                            {firstCharToUpperCase(pokemonName)}
                        </span>
                    </h2>
                    <div className="flex items-center justify-around gap-8 w-full *:px-4 *:py-2 *:rounded-md *:w-full *:text-2xl ">
                        <button
                            onClick={restartGame}
                            className="hover:border-blue-400 hover:border-2 border-blue-500 border"
                        >
                            Play Again
                        </button>

                        <button className="hover:bg-blue-400 bg-blue-500 transition-all duration-300">
                            <Link href={GAMEMODES[1].link}>Next Game </Link>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
