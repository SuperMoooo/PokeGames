'use client';
import {
    allPokemons,
    getPokemon,
    getPokemonMoreData,
} from '@/app/actions/pokemonApiCalls';
import Bg from '@/app/components/Bg';
import Footer from '@/app/components/Footer';
import HeaderInput from '@/app/components/HeaderInput';
import Loading from '@/app/components/Loading';
import SubmitRow from '@/app/components/SubmitRow';
import { PokeRow } from '@/app/lib/constants';
import { firstCharToLowerCase, firstCharToUpperCase } from '@/app/lib/hooks';
import React, { useEffect, useState } from 'react';

export default function PokeGuess() {
    //STATES
    const [rightPokemon, setRightPokemon] = useState<any>([]);
    const [rightPokemonMoreData, setRightPokemonMoreData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [allPokemonList, setAllPokemonList] = useState<string[]>([]);
    const [gameEnded, setGameEnded] = useState<boolean>(false);
    const [pokemonInput, setPokemonInput] = useState<string>('');
    const [rows, setRows] = useState<any[]>([]);
    const [closestPokemon, setClosestPokemon] = useState<string>('');
    const [disableInput, setDisableInput] = useState<boolean>(false);

    //EFFECTS
    useEffect(() => {
        const getRandomPokemon = async () => {
            const randomNumber = Math.floor(Math.random() * (1026 - 0) + 0);
            //START LOADING
            setLoading(true);
            try {
                //FETCH LIST OF ALL POKEMONS
                const allPokemon = await allPokemons();
                //GET IMAGE OF THE SPECIFIC POKEMON
                const rightPokemonData = await getPokemon(
                    allPokemon.results[randomNumber].name
                );
                const rightPokemonMoreData = await getPokemonMoreData(
                    rightPokemonData.species.url
                );
                console.log(rightPokemonData.name);
                setRightPokemon(rightPokemonData);
                setRightPokemonMoreData(rightPokemonMoreData);

                //GET ALL NAMES OF THE POKEMONS
                const pokemonAuxList = allPokemon.results.map(
                    (pokemon: any, index: number) => [pokemon.name, index]
                );
                setAllPokemonList(pokemonAuxList);

                //FINISH LOADING
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getRandomPokemon();
    }, []);

    //FUNCTIONS
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setDisableInput(true);
        try {
            if (pokemonInput === '') {
                setDisableInput(false);
                return;
            }

            e.preventDefault();
            const thisPokemonData = await getPokemon(
                closestPokemon[0].toLocaleLowerCase()
            );
            const morePokemonData = await getPokemonMoreData(
                thisPokemonData.species.url
            );
            let habitatValue;
            let rightHabitatValue;
            if (morePokemonData.habitat !== null) {
                habitatValue = morePokemonData.habitat.name;
            } else {
                habitatValue = morePokemonData.habitat;
            }
            if (rightPokemonMoreData.habitat !== null) {
                rightHabitatValue = rightPokemonMoreData.habitat.name;
            } else {
                rightHabitatValue = rightPokemonMoreData.habitat;
            }

            const PokeRow: PokeRow = [
                {
                    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${thisPokemonData.id}.png`,
                    value: null,
                },
                {
                    name: thisPokemonData.name,
                    value:
                        thisPokemonData.name === rightPokemon.name
                            ? 'green'
                            : 'red',
                },
                {
                    type1: thisPokemonData.types[0].type.name,
                    value:
                        thisPokemonData.types[0].type.name ===
                        rightPokemon.types[0].type.name
                            ? 'green'
                            : 'red',
                },
                {
                    type2: thisPokemonData.types[1]?.type.name,
                    value:
                        thisPokemonData.types[1]?.type.name ===
                        rightPokemon.types[1]?.type.name
                            ? 'green'
                            : 'red',
                },
                {
                    color: morePokemonData.color.name,
                    value:
                        morePokemonData.color.name ===
                        rightPokemonMoreData.color.name
                            ? 'green'
                            : 'red',
                },
                {
                    habitat:
                        morePokemonData.habitat !== null
                            ? morePokemonData.habitat.name
                            : 'Null',

                    value: rightHabitatValue === habitatValue ? 'green' : 'red',
                },
            ];
            setRows((prevRows) => [...prevRows, PokeRow]);
            if (pokemonInput.toLocaleLowerCase() === rightPokemon.name) {
                setTimeout(() => {
                    setGameEnded(true);
                }, 3500);
            }
            setPokemonInput('');
            setTimeout(() => {
                setDisableInput(false);
            }, 2500);
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <Loading />;
    }
    return (
        <div className="grid grid-rows-[1fr_auto] justify-center w-full min-h-[100dvh] p-6">
            <Bg />
            <main className="z-10 grid grid-rows-[auto_1fr] gap-12">
                <HeaderInput
                    gameEnded={gameEnded}
                    rightPokemon={rightPokemon}
                    pokemonList={allPokemonList}
                    setPokemonInput={setPokemonInput}
                    pokemonInput={pokemonInput}
                    handleSubmit={handleSubmit}
                    setClosestPokemon={setClosestPokemon}
                    disableInput={disableInput}
                />
                <SubmitRow rows={rows} />
            </main>
            <Footer />
        </div>
    );
}
