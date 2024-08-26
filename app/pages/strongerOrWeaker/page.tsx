'use client';
import {
    addStreakToDB,
    readDataFromDB,
    updateData,
} from '@/app/actions/databaseActions';
import { getPokemon } from '@/app/actions/pokemonApiCalls';
import Bg from '@/app/components/Bg';
import Footer from '@/app/components/Footer';
import GetUserName from '@/app/components/GetUserName';
import GoBack from '@/app/components/GoBack';
import Loading from '@/app/components/Loading';
import ModalEndGame from '@/app/components/StrongerOrWeaker/ModalEndGame';
import PokeCard from '@/app/components/StrongerOrWeaker/PokeCard';
import UpDownBtn from '@/app/components/StrongerOrWeaker/UpDownBtn';
import { firstCharToUpperCase } from '@/app/lib/hooks';
import { setAuxGlobalAllPokemons2 } from '@/app/store/globalSlice';
import {
    removeElement,
    resetList,
    setPokemonsForStrongerOrWeaker,
} from '@/app/store/strongerOrWeakerSlice/unknownPokemonSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function StrongerOrWeaker() {
    //REDUX STATES
    const listOfPokemonForStrongerOrWeaker = useSelector(
        (state: any) =>
            state.unknownPokemon.listOfPokemonForStrongerOrWeaker || []
    );

    const allPokemonsList = useSelector(
        (state: any) => state.globalAllPokemons.auxGlobalPokemons2 || []
    );

    const allPokemonsGlobal = useSelector(
        (state: any) => state.globalAllPokemons.globalAllPokemons || []
    );

    const playerName = useSelector(
        (state: any) => state.globalAllPokemons.playerName || ''
    );

    //STATES
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const [restartGameTrigger, setRestartGameTrigger] =
        useState<boolean>(false);

    const [disableBtn, setDisableBtn] = useState<boolean>(false);
    const [showAttackUnknown, setShowAttackUnknown] = useState<boolean>(false);
    const [gameEnded, setGameEnded] = useState<boolean>(false);
    const [result, setResult] = useState<string>('');
    const [streak, setStreak] = useState<number>(0);
    //FUNCTIONS

    const handleBtnClick = async (value: number) => {
        setDisableBtn(true);
        try {
            setShowAttackUnknown(true);
            //ADD MORE 1 POKEMON TO THE LIST
            const randomNumberAux = Math.floor(
                Math.random() * (allPokemonsList.length - 0) + 0
            );
            if (allPokemonsList.length !== 0) {
                const morePokemon = await getPokemon(
                    allPokemonsList[randomNumberAux][0]
                );
                //REMOVE THE POKEMON FROM THE LIST SO IT DOESNT REPEAT
                let updatedAuxList = allPokemonsList.filter(
                    (pokemonAux: any) =>
                        pokemonAux[0] !== allPokemonsList[randomNumberAux][0]
                );
                dispatch(setAuxGlobalAllPokemons2(updatedAuxList));
                const auxPoke = {
                    name: morePokemon.name,
                    image: allPokemonsList[randomNumberAux][1],
                    attack: morePokemon.stats[1]['base_stat'],
                };
                dispatch(setPokemonsForStrongerOrWeaker(auxPoke));
                const firstPokeAttack =
                    listOfPokemonForStrongerOrWeaker[0].attack;
                const secondPokeAttack =
                    listOfPokemonForStrongerOrWeaker[1].attack;
                //TRUE = STRONGER
                if (value === 1) {
                    //IF UNKNOWN POKEMON IS STRONGER
                    if (secondPokeAttack > firstPokeAttack) {
                        setTimeout(() => {
                            setShowAttackUnknown(false);
                            setStreak(streak + 1);
                            dispatch(
                                removeElement(
                                    listOfPokemonForStrongerOrWeaker[0].name
                                )
                            );
                        }, 4000);
                    } else {
                        setResult('YOU LOSE');
                        setTimeout(() => {
                            setGameEnded(true);
                            updateData(playerName, streak);
                        }, 4000);
                    }
                } else if (value === 2) {
                    if (secondPokeAttack === firstPokeAttack) {
                        setTimeout(() => {
                            setShowAttackUnknown(false);
                            setStreak(streak + 1);
                            dispatch(
                                removeElement(
                                    listOfPokemonForStrongerOrWeaker[0].name
                                )
                            );
                        }, 4000);
                    } else {
                        setResult('YOU LOSE');
                        setTimeout(() => {
                            setGameEnded(true);
                            updateData(playerName, streak);
                        }, 4000);
                    }
                } else {
                    //IF UNKNOWN POKEMON IS WEAKER
                    if (secondPokeAttack < firstPokeAttack) {
                        setTimeout(() => {
                            setShowAttackUnknown(false);
                            setStreak(streak + 1);
                            dispatch(
                                removeElement(
                                    listOfPokemonForStrongerOrWeaker[0].name
                                )
                            );
                        }, 4000);
                    } else {
                        setResult('YOU LOSE');
                        setTimeout(() => {
                            setGameEnded(true);
                            updateData(playerName, streak);
                        }, 4000);
                    }
                }
            } else {
                setResult('You Win');
                setTimeout(() => {
                    setGameEnded(true);
                }, 4000);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setTimeout(() => {
                setDisableBtn(false);
            }, 4000);
        }
    };

    //EFFECTS

    useEffect(() => {
        const restartGame = () => {
            dispatch(resetList([]));
            dispatch(setAuxGlobalAllPokemons2(allPokemonsGlobal));
            setRestartGameTrigger(false);
            getPokemonsStats();
            setGameEnded(false);
            setShowAttackUnknown(false);
            setStreak(0);
        };

        const getPokemonsStats = async () => {
            try {
                setLoading(true);
                if (listOfPokemonForStrongerOrWeaker.length === 0) {
                    const randomNumber = Math.floor(
                        Math.random() * (allPokemonsList.length - 0) + 0
                    );
                    const randomNumber2 = Math.floor(
                        Math.random() * (allPokemonsList.length - 0) + 0
                    );
                    const randomNumber3 = Math.floor(
                        Math.random() * (allPokemonsList.length - 0) + 0
                    );
                    const randomNumber4 = Math.floor(
                        Math.random() * (allPokemonsList.length - 0) + 0
                    );

                    // SET FIRST 4 POKEMONS
                    const firstPoke = await getPokemon(
                        allPokemonsList[randomNumber][0]
                    );
                    //REMOVE THE POKEMON FROM THE LIST SO IT DOESNT REPEAT
                    let updatedAuxList = allPokemonsList.filter(
                        (pokemonAux: any) =>
                            pokemonAux[0] !== allPokemonsList[randomNumber][0]
                    );
                    dispatch(setAuxGlobalAllPokemons2(updatedAuxList));

                    const unknownPoke = await getPokemon(
                        allPokemonsList[randomNumber2][0]
                    );

                    updatedAuxList = allPokemonsList.filter(
                        (pokemonAux: any) =>
                            pokemonAux[0] !== allPokemonsList[randomNumber2][0]
                    );
                    dispatch(setAuxGlobalAllPokemons2(updatedAuxList));

                    const unknownPoke2 = await getPokemon(
                        allPokemonsList[randomNumber3][0]
                    );
                    updatedAuxList = allPokemonsList.filter(
                        (pokemonAux: any) =>
                            pokemonAux[0] !== allPokemonsList[randomNumber3][0]
                    );
                    dispatch(setAuxGlobalAllPokemons2(updatedAuxList));

                    const unknownPoke3 = await getPokemon(
                        allPokemonsList[randomNumber4][0]
                    );
                    updatedAuxList = allPokemonsList.filter(
                        (pokemonAux: any) =>
                            pokemonAux[0] !== allPokemonsList[randomNumber4][0]
                    );
                    dispatch(setAuxGlobalAllPokemons2(updatedAuxList));

                    //SET THE STATS OF THE FIRST TWO POKEMONS
                    const auxPoke = {
                        name: firstPoke.name,
                        image: allPokemonsList[randomNumber][1],
                        attack: firstPoke.stats[1]['base_stat'],
                    };

                    const auxPoke2 = {
                        name: unknownPoke.name,
                        image: allPokemonsList[randomNumber2][1],
                        attack: unknownPoke.stats[1]['base_stat'],
                    };

                    const auxPoke3 = {
                        name: unknownPoke2.name,
                        image: allPokemonsList[randomNumber3][1],
                        attack: unknownPoke2.stats[1]['base_stat'],
                    };
                    const auxPoke4 = {
                        name: unknownPoke3.name,
                        image: allPokemonsList[randomNumber4][1],
                        attack: unknownPoke3.stats[1]['base_stat'],
                    };

                    dispatch(setPokemonsForStrongerOrWeaker(auxPoke));
                    dispatch(setPokemonsForStrongerOrWeaker(auxPoke2));
                    dispatch(setPokemonsForStrongerOrWeaker(auxPoke3));
                    dispatch(setPokemonsForStrongerOrWeaker(auxPoke4));
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        if (restartGameTrigger) {
            restartGame();
        } else {
            getPokemonsStats();
        }

        const yo = async () => {
            //const yo = await readDataFromDB();
        };
        yo();
    }, [restartGameTrigger]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="grid grid-rows-[auto_1fr_auto] w-full min-h-[100dvh] gap-6 p-6">
            <Bg />
            <GetUserName />
            <GoBack
                resetBtn={true}
                resetGame={() => setRestartGameTrigger(true)}
            />
            <main className="z-20 flex items-center justify-center w-full flex-col gap-8 overflow-x-hidden">
                <h1 className="text-3xl text-center">
                    Is{' '}
                    <span className="font-bold text-4xl">
                        {listOfPokemonForStrongerOrWeaker[1]?.name
                            ? firstCharToUpperCase(
                                  listOfPokemonForStrongerOrWeaker[1]?.name
                              )
                            : '??'}
                    </span>{' '}
                    Stronger or Weaker?
                </h1>
                <section className=" flex justify-between items-center w-full h-full overflow-x-hidden relative ">
                    {listOfPokemonForStrongerOrWeaker.map(
                        (pokemon: any, index: number) => {
                            return (
                                <div
                                    key={pokemon.name}
                                    className={`transition-transform duration-300  ${
                                        index > 1
                                            ? 'translate-x-[100%] hidden'
                                            : ''
                                    }`}
                                >
                                    <PokeCard
                                        data={pokemon}
                                        card={index}
                                        showAttack={showAttackUnknown}
                                    />
                                </div>
                            );
                        }
                    )}
                </section>
                <UpDownBtn
                    disableBtn={disableBtn}
                    handleClick={handleBtnClick}
                    streak={streak}
                />
            </main>
            <ModalEndGame
                gameEnded={gameEnded}
                restartGame={() => setRestartGameTrigger(true)}
                result={result}
                streak={streak}
            />
            <Footer />
        </div>
    );
}
