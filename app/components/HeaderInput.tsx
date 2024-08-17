import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { firstCharToUpperCase } from '../lib/hooks';

interface HeaderProps {
    gameEnded: boolean;
    rightPokemon: any;
    pokemonList: string[];
    setPokemonInput: any;
    pokemonInput: string;
    handleSubmit: (e: any) => void;
    setClosestPokemon: any;
    disableInput: boolean;
}
export default function HeaderInput({
    gameEnded,
    rightPokemon,
    pokemonList,
    setPokemonInput,
    pokemonInput,
    handleSubmit,
    setClosestPokemon,
    disableInput,
}: HeaderProps) {
    const [filtered, setFiltered] = useState<string[]>([]);
    useEffect(() => {
        const filtered = pokemonList.filter((pokemon) =>
            pokemon[0].toLowerCase().startsWith(pokemonInput.toLowerCase())
        );
        setFiltered(filtered);

        // Set the closest pokemon after filtering
        if (filtered.length > 0) {
            setClosestPokemon(filtered[0]);
        }
    }, [pokemonInput]);
    return (
        <section className="flex items-center flex-col text-center gap-4 h-full">
            <div className="p-4 flex items-center flex-col">
                <h1 className=" text-5xl">Guess the Pokemon</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Type the Pokemon name"
                        id="pokemonInput"
                        autoComplete="off"
                        className={`bg-transparent pl-4 pr-16 border w-72 rounded-t-lg py-2 focus:outline-none text-left ${
                            disableInput && 'opacity-55'
                        }`}
                        value={pokemonInput}
                        disabled={disableInput}
                        onChange={(e) => setPokemonInput(e.target.value)}
                    />
                    <button
                        aria-label="Submit Pokemon"
                        title="Submit Pokemon"
                        disabled={disableInput}
                        onClick={handleSubmit}
                        className={`absolute top-0 ${
                            disableInput && 'opacity-55'
                        } right-0 h-full outline-none w-20 rounded-t-lg border-r pl-4 pr-2 py-2 flex items-center justify-center`}
                    >
                        <svg
                            fill="none"
                            strokeWidth={1}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className="w-full h-full"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className={`flex flex-col items-center justify-start absolute w-[18em] ${
                        filtered.length > 5 && 'h-80'
                    }   ${
                        pokemonInput !== '' && 'bg-white overflow-y-scroll'
                    } z-30`}
                >
                    {pokemonList
                        .filter((pokemon) =>
                            pokemon[0]
                                .toLowerCase()
                                .startsWith(pokemonInput.toLowerCase())
                        )
                        .map((pokemon, index) => {
                            return (
                                <div
                                    onClick={(e) => {
                                        setPokemonInput(
                                            firstCharToUpperCase(pokemon[0])
                                        );
                                        handleSubmit(e);
                                    }}
                                    className={` px-4 py-2 w-full h-full z-50 cursor-pointer bg-white text-black hover:bg-zinc-100 font-bold transition-colors duration-300   ${
                                        pokemonInput !== '' ? 'block' : 'hidden'
                                    } ${
                                        pokemonList.length === index
                                            ? 'rounded-b-lg'
                                            : ''
                                    }`}
                                    key={pokemon}
                                >
                                    <div className="relative w-full h-full grid grid-cols-[auto_1fr] items-center">
                                        <picture className="w-full h-full relative ">
                                            <Image
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                                                    pokemon[1] + 1
                                                }.png`}
                                                alt={pokemon}
                                                width={60}
                                                height={60}
                                            />
                                        </picture>
                                        <span>
                                            {pokemonInput !== '' &&
                                                firstCharToUpperCase(
                                                    pokemon[0]
                                                )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </form>
        </section>
    );
}
