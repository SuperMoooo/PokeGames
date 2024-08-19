'use client';
import {
    allPokemons,
    getPokemon,
    getPokemonMoreData,
} from '@/app/actions/pokemonApiCalls';
import Bg from '@/app/components/Bg';
import Congratulations from '@/app/components/PokeGuess/Congratulations';
import Footer from '@/app/components/Footer';
import HeaderInput from '@/app/components/PokeGuess/HeaderInput';
import Loading from '@/app/components/Loading';
import ModalGuessed from '@/app/components/PokeGuess/ModalGuessed';
import SubmitRow from '@/app/components/PokeGuess/SubmitRow';
import { PokeRow } from '@/app/lib/constants';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setCorrectPokemonData,
    setCorrectPokemonMoreData,
} from '@/app/store/pokeGuessSlice/rightPokemonSlice';
import { setAllPokemons } from '@/app/store/pokeGuessSlice/allPokemonsSlice';
import {
    resetPokemonRows,
    setPokemonRows,
} from '@/app/store/pokeGuessSlice/rowsPokemonSlice';

export default function PokeGuess() {
    // REDUX STATES
    const rightPokemonFirstData = useSelector(
        (state: any) => state.rightPokemon.rightPokemonData[0].firstData || []
    );
    const rightPokemonSecondData = useSelector(
        (state: any) => state.rightPokemon.rightPokemonData[0].secondData || []
    );
    const allPokemonList = useSelector(
        (state: any) => state.allPokemons.allPokeData || []
    );

    const dispatch = useDispatch();
    //STATES
    const [loading, setLoading] = useState<boolean>(true);
    const [gameEnded, setGameEnded] = useState<boolean>(false);
    const [pokemonInput, setPokemonInput] = useState<string>('');
    const [disableInput, setDisableInput] = useState<boolean>(false);
    const [restartGameTrigger, setRestartGameTrigger] =
        useState<boolean>(false);

    //EFFECTS
    useEffect(() => {
        const restartGame = () => {
            setLoading(true);
            setRestartGameTrigger(false);
            setGameEnded(false);
            setPokemonInput('');
            setDisableInput(false);
            getRandomPokemon();
            dispatch(resetPokemonRows([]));
            dispatch(setCorrectPokemonData([]));
            dispatch(setCorrectPokemonMoreData([]));
        };
        const getRandomPokemon = async () => {
            try {
                if (
                    rightPokemonFirstData.length === 0 &&
                    rightPokemonSecondData.length === 0
                ) {
                    //START LOADING
                    setLoading(true);

                    //FETCH LIST OF ALL POKEMONS
                    const allPokemon = await allPokemons();
                    const randomNumber = Math.floor(
                        Math.random() * (allPokemon.results.length - 0) + 0
                    );
                    //GET ALL NAMES OF THE POKEMONS
                    const pokemonAuxList = allPokemon.results.map(
                        (pokemon: any) => [
                            pokemon.name,
                            parseInt(
                                pokemon.url.split('pokemon/')[1].split('/')[0]
                            ),
                        ]
                    );
                    // SET STATES REDUX
                    dispatch(setAllPokemons(pokemonAuxList));

                    const rightPokemonData = await getPokemon(
                        allPokemon.results[randomNumber].name
                    );
                    const rightPokemonMoreData = await getPokemonMoreData(
                        rightPokemonData.species.url
                    );

                    // SET STATES REDUX
                    dispatch(setCorrectPokemonData(rightPokemonData));
                    dispatch(setCorrectPokemonMoreData(rightPokemonMoreData));
                }
            } catch (error) {
                console.log(error);
            } finally {
                //FINISH LOADING
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            }
        };

        if (restartGameTrigger) {
            restartGame();
        } else {
            getRandomPokemon();
        }
    }, [restartGameTrigger]);
    //FUNCTIONS
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
        pokemon: string
    ) => {
        setDisableInput(true);
        try {
            if (pokemonInput === '') {
                setDisableInput(false);
                return;
            }

            e.preventDefault();
            const updatedList = allPokemonList.filter(
                (pokemonAux: any) =>
                    pokemonAux[0] !== pokemon.toLocaleLowerCase()
            );

            dispatch(setAllPokemons(updatedList));
            const thisPokemonData = await getPokemon(
                pokemon.toLocaleLowerCase().trim()
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
            if (rightPokemonSecondData.habitat !== null) {
                rightHabitatValue = rightPokemonSecondData.habitat.name;
            } else {
                rightHabitatValue = rightPokemonSecondData.habitat;
            }

            const PokeRow: PokeRow = [
                {
                    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${thisPokemonData.id}.png`,
                    value: null,
                },
                {
                    name: thisPokemonData.name,
                    value:
                        thisPokemonData.name === rightPokemonFirstData.name
                            ? 'green'
                            : 'red',
                },
                {
                    gen: morePokemonData.generation.name.split('-')[1],
                    value:
                        morePokemonData.generation.name ===
                        rightPokemonSecondData.generation.name
                            ? 'green'
                            : 'red',
                },
                {
                    type1: thisPokemonData.types[0].type.name,
                    value:
                        thisPokemonData.types[0].type.name ===
                        rightPokemonFirstData.types[0].type.name
                            ? 'green'
                            : 'red',
                },
                {
                    type2: thisPokemonData.types[1]?.type.name,
                    value:
                        thisPokemonData.types[1]?.type.name ===
                        rightPokemonFirstData.types[1]?.type.name
                            ? 'green'
                            : 'red',
                },
                {
                    color: morePokemonData.color.name,
                    value:
                        morePokemonData.color.name ===
                        rightPokemonSecondData.color.name
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
            dispatch(setPokemonRows(PokeRow));
            if (pokemon.toLocaleLowerCase() === rightPokemonFirstData.name) {
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
        } finally {
            setTimeout(() => {
                setDisableInput(false);
            }, 2500);
        }
    };

    const triggerRestartGame = () => {
        setRestartGameTrigger(true);
    };

    if (loading) {
        return <Loading />;
    }
    return (
        <div className="grid grid-rows-[1fr_auto] justify-center w-full min-h-[100dvh] p-6">
            <Bg />
            <main className="z-10 grid grid-rows-[auto_1fr] gap-12">
                <HeaderInput
                    pokemonList={allPokemonList}
                    setPokemonInput={setPokemonInput}
                    pokemonInput={pokemonInput}
                    handleSubmit={handleSubmit}
                    disableInput={disableInput}
                    resetGame={triggerRestartGame}
                />
                <SubmitRow />
            </main>
            <Congratulations gameEnded={gameEnded} />
            <ModalGuessed
                pokeImg={
                    rightPokemonFirstData?.sprites?.other['official-artwork'][
                        'front_default'
                    ]
                }
                pokemonName={rightPokemonFirstData.name}
                gameEnded={gameEnded}
                restartGame={triggerRestartGame}
            />
            <Footer />
        </div>
    );
}
