'use client';
import Bg from '@/app/components/Bg';
import Input from '@/app/components/BlurPokemon/Input';
import ModalGuessedBlur from '@/app/components/BlurPokemon/ModalGuessedBlur';
import PokemonImage from '@/app/components/BlurPokemon/PokemonImage';
import PokemonsTries from '@/app/components/BlurPokemon/PokemonsTries';
import Footer from '@/app/components/Footer';
import GetUserName from '@/app/components/GetUserName';
import GoBack from '@/app/components/GoBack';
import Loading from '@/app/components/Loading';
import { PokemonBlur, RowBlur } from '@/app/lib/constants';
import { firstCharToLowerCase } from '@/app/lib/hooks';
import { setCorrectPokemonBlur } from '@/app/store/blurImgSlice/blurPokemonSlice';
import {
    resetBlurRows,
    setBlurRows,
} from '@/app/store/blurImgSlice/blurRowsSlice';
import { setAuxGlobalAllPokemonsBlur } from '@/app/store/globalSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function BlurPokemon() {
    //REDUX STATES
    const pokemonBlurData = useSelector(
        (state: any) => state.blurPokemon.blurPokemonData || []
    );

    const blurRows = useSelector((state: any) => state.blurRows.data || []);

    const allPokemonsList = useSelector(
        (state: any) => state.globalAllPokemons.auxGlobalPokemonsBlur || []
    );

    const allPokemonsGlobal = useSelector(
        (state: any) => state.globalAllPokemons.globalAllPokemons || []
    );

    //STATES
    const [loading, setLoading] = useState<boolean>(true);
    const [restartGameTrigger, setRestartGameTrigger] =
        useState<boolean>(false);
    const dispatch = useDispatch();
    const [pokemonInput, setPokemonInput] = useState<string>('');
    const [disableInput, setDisableInput] = useState<boolean>(false);
    const [gameEnded, setGameEnded] = useState<boolean>(false);

    // EFECTS
    useEffect(() => {
        const getBlurPokemon = () => {
            try {
                setLoading(true);
                if (pokemonBlurData.length === 0) {
                    const randomNumber = Math.floor(
                        Math.random() * allPokemonsList.length
                    );
                    const pokemonBlur: PokemonBlur[] = [
                        {
                            name: allPokemonsList[randomNumber][0],
                            img: allPokemonsList[randomNumber][1],
                        },
                    ];
                    dispatch(setCorrectPokemonBlur(pokemonBlur));
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        const restartGame = () => {
            setRestartGameTrigger(false);
            dispatch(setAuxGlobalAllPokemonsBlur(allPokemonsGlobal));
            setDisableInput(false);
            setPokemonInput('');
            dispatch(resetBlurRows([]));
            setGameEnded(false);
            getBlurPokemon();
            dispatch(setCorrectPokemonBlur([]));
        };
        if (restartGameTrigger) {
            restartGame();
        } else {
            getBlurPokemon();
        }
    }, [restartGameTrigger]);

    const handleSubmit = (e: any, pokemon: any) => {
        e.preventDefault();
        setDisableInput(true);
        try {
            if (pokemonInput === '') {
                setDisableInput(false);
                return;
            }
            const pokeRowData = allPokemonsList.filter(
                (pokemonAux: any) =>
                    pokemonAux[0] === pokemon.toLocaleLowerCase()
            );

            const rowBlur: RowBlur = [
                { img: pokeRowData[0][1], value: null },
                {
                    name: pokeRowData[0][0],
                    value:
                        firstCharToLowerCase(pokeRowData[0][0]) ===
                        firstCharToLowerCase(pokemonBlurData[0].name)
                            ? 'green'
                            : 'red',
                },
            ];
            dispatch(setBlurRows(rowBlur));
            //REMOVE POKEMON CLICKED FROM LIST
            const updatedList = allPokemonsList.filter(
                (pokemonAux: any) =>
                    pokemonAux[0] !== pokemon.toLocaleLowerCase()
            );

            dispatch(setAuxGlobalAllPokemonsBlur(updatedList));

            //GET THIS POKEMON DATA

            if (pokemon.toLocaleLowerCase() === pokemonBlurData[0].name) {
                setTimeout(() => {
                    setGameEnded(true);
                    setDisableInput(true);
                    setPokemonInput('');
                }, 2000);
            } else {
                setPokemonInput('');
                setTimeout(() => {
                    setDisableInput(false);
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <Loading />;
    }
    return (
        <div className="grid grid-rows-[auto_1fr_auto] w-full min-h-[100dvh] gap-6 p-6 ">
            <Bg />
            <GetUserName />
            <GoBack
                resetBtn={true}
                resetGame={() => setRestartGameTrigger(true)}
            />
            <main className="z-30 w-full h-full grid grid-rows-[auto_1fr_auto] justify-center items-center gap-8">
                <PokemonImage data={pokemonBlurData} />
                <Input
                    handleSubmit={handleSubmit}
                    pokemonInput={pokemonInput}
                    setPokemonInput={setPokemonInput}
                    disableInput={disableInput}
                />
                <PokemonsTries rowsPokemon={blurRows} />
            </main>
            <ModalGuessedBlur
                pokeImg={pokemonBlurData[0]?.img}
                pokemonName={pokemonBlurData[0]?.name}
                restartGame={() => setRestartGameTrigger(true)}
                gameEnded={gameEnded}
            />
            <Footer />
        </div>
    );
}
