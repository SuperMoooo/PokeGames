'use client';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react';
import { MAX_POS, PokeBalls } from '../lib/constants';

interface ActivationProps {
    gameEnded: boolean;
}
export default function Congratulations({ gameEnded }: ActivationProps) {
    const [pokeBalls, setPokeBalls] = useState<any[]>([]);
    useEffect(() => {
        const handleWin = () => {
            const randomAmountPokeBalls = Math.floor(
                Math.random() * (200 - 90) + 90
            );
            let newListPokeballs = [];
            let randomPokeBall = 0;
            let randomPositions = 0;
            let randomAnimation = 0;
            for (let i = 0; i < randomAmountPokeBalls; i++) {
                // GET RANDOM VALUES
                randomPokeBall = Math.floor(Math.random() * 4);
                randomPositions = Math.floor(Math.random() * (MAX_POS - 0) + 0);
                randomAnimation = Math.floor(Math.random() * 4);

                // PUSH THE NEW OBJ
                newListPokeballs.push({
                    id: Math.random() * 10000,
                    name: PokeBalls[randomPokeBall],
                    pos: randomPositions,
                    animation: randomAnimation,
                });
            }
            setPokeBalls(newListPokeballs);
        };
        if (gameEnded) {
            handleWin();
        }
    }, [gameEnded]);

    if (pokeBalls.length === 0) return null;

    return (
        <main className="absolute z-30 top-0 left-0 w-full min-h-[100dvh]">
            <section className="absolute w-full min-h-[100dvh] overflow-x-hidden overflow-y-hidden">
                {pokeBalls.map((pokeball) => {
                    return (
                        <div key={pokeball.id}>
                            <Image
                                src={pokeball.name}
                                alt="PokeBall"
                                width={100}
                                height={100}
                                style={{
                                    left: `${pokeball.pos}px`,
                                }}
                                className={`absolute gongratulations${pokeball.animation}`}
                            />
                            <Image
                                src={pokeball.name}
                                alt="PokeBall"
                                width={100}
                                height={100}
                                style={{
                                    left: `${pokeball.pos}px`,
                                }}
                                className={`absolute gongratulations${pokeball.animation}`}
                            />
                        </div>
                    );
                })}
            </section>
        </main>
    );
}
