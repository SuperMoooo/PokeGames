import Image from 'next/image';
import React from 'react';
import { firstCharToUpperCase } from '../../lib/hooks';
import Link from 'next/link';
import { GAMEMODES } from '../../lib/constants';

interface ModalProps {
    pokeImg: string;
    pokemonName: string;
    gameEnded: boolean;
    restartGame: () => void;
}

export default function ModalGuessedBlur({
    pokeImg,
    pokemonName,
    gameEnded,
    restartGame,
}: ModalProps) {
    return (
        <main
            className={`fixed top-0 left-0 w-full min-h-[100dvh] bg-black/50  items-center justify-center z-30 ${
                gameEnded ? 'flex' : 'hidden'
            }`}
        >
            <section className="z-50 rounded-lg bg-zinc-700 md:py-10 md:px-20 sm:py-5 sm:px-10 p-8 grid grid-cols-[1fr] revealCard1 gap-4 ">
                <picture className="flex items-center justify-center flex-col gap-5 relative">
                    <h1 className="text-center md:text-6xl sm:text-4xl text-2xl">
                        Gongratulations!!!
                    </h1>
                    <Image
                        src={
                            pokeImg
                                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeImg}.png`
                                : '/pokemon.png'
                        }
                        alt="pokemon blur"
                        width={300}
                        height={300}
                        className="md:w-80 sm:w-72 w-44 "
                        unoptimized
                    />
                </picture>
                <div className="flex items-center justify-center flex-col  gap-8">
                    <h2 className="md:text-4xl sm:text-2xl text-xl">
                        It's{' '}
                        <span className="font-bold">
                            {pokemonName && firstCharToUpperCase(pokemonName)}
                        </span>
                    </h2>
                    <div className="flex items-center sm:justify-around justify-center gap-8 w-full *:px-4 *:py-2 *:rounded-md *:w-full md:*:text-2xl sm:*:text-lg *:text-sm ">
                        <button
                            onClick={restartGame}
                            className="hover:bg-zinc-400  bg-zinc-500 transition-all duration-300"
                        >
                            Play Again
                        </button>

                        <button
                            onClick={restartGame}
                            className="hover:bg-blue-400 bg-blue-500 transition-all duration-300 whitespace-nowrap "
                        >
                            <Link href={GAMEMODES[2].link}>Next Game</Link>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
