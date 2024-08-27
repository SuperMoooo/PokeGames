import { firstCharToUpperCase } from '@/app/lib/hooks';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

interface InputProps {
    handleSubmit: (e: any, pokemon: any) => void;
    disableInput: boolean;
    pokemonInput: string;
    setPokemonInput: any;
}

export default function Input({
    handleSubmit,
    disableInput,
    pokemonInput,
    setPokemonInput,
}: InputProps) {
    const allPokemonsList = useSelector(
        (state: any) => state.globalAllPokemons.auxGlobalPokemonsBlur || []
    );
    const [filtered, setFiltered] = useState<string[]>([]);
    const [closestPokemon, setClosestPokemon] = useState<string>('');
    useMemo(() => {
        const filtered = allPokemonsList.filter((pokemon: any) =>
            pokemon[0].toLowerCase().startsWith(pokemonInput.toLowerCase())
        );
        setFiltered(filtered);

        // Set the closest pokemon after filtering
        if (filtered.length > 0) {
            setClosestPokemon(filtered[0]);
        }
    }, [pokemonInput]);
    return (
        <form
            className="flex flex-col items-center justify-start h-full"
            onSubmit={(e) => handleSubmit(e, closestPokemon[0])}
        >
            <input
                type="text"
                placeholder="Type the Pokemon name"
                id="pokemonInput"
                autoComplete="off"
                className={`bg-transparent pl-4 pr-16 border w-72 rounded-t-lg py-2 focus:outline-none text-left z-50 ${
                    disableInput && 'opacity-55'
                }`}
                value={pokemonInput}
                disabled={disableInput}
                onChange={(e) => setPokemonInput(e.target.value)}
            />
            <div
                className={`flex flex-col items-center justify-start absolute top-[34.1rem] w-[18em] ${
                    filtered.length > 5 && 'h-80'
                }   ${
                    pokemonInput !== '' && 'bg-white overflow-y-scroll'
                } z-30`}
            >
                {allPokemonsList
                    .filter((pokemon: any) =>
                        pokemon[0]
                            .toLowerCase()
                            .startsWith(pokemonInput.toLowerCase())
                    )
                    .map((pokemon: any, index: number) => {
                        return (
                            <div
                                onClick={(e) => {
                                    setPokemonInput(
                                        firstCharToUpperCase(
                                            e.currentTarget.innerText
                                        )
                                    );

                                    handleSubmit(e, e.currentTarget.innerText);
                                }}
                                className={` px-4 py-2 w-full h-full z-50 cursor-pointer bg-white text-black hover:bg-zinc-100 font-bold transition-colors duration-300   ${
                                    pokemonInput !== '' ? 'block' : 'hidden'
                                } ${
                                    allPokemonsList.length === index
                                        ? 'rounded-b-lg'
                                        : ''
                                }`}
                                key={pokemon}
                            >
                                <div className="relative w-full h-full grid grid-cols-[auto_1fr] items-center">
                                    <span>
                                        {pokemonInput !== '' &&
                                            firstCharToUpperCase(pokemon[0])}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </form>
    );
}
