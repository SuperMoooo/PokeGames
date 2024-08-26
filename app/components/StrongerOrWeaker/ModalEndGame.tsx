import Image from 'next/image';
import React from 'react';
import { firstCharToUpperCase } from '../../lib/hooks';
import Link from 'next/link';
import { GAMEMODES } from '../../lib/constants';

interface ModalProps {
    gameEnded: boolean;
    restartGame: () => void;
    result: string;
    streak: number;
}

export default function ModalEndGame({
    gameEnded,
    restartGame,
    result,
    streak,
}: ModalProps) {
    return (
        <main
            className={`fixed top-0 left-0 w-full min-h-[100dvh] bg-black/50  items-center justify-center z-30 ${
                gameEnded ? 'flex' : 'hidden'
            }`}
        >
            <section className="z-50 rounded-lg bg-zinc-700 md:py-10 md:px-20 sm:py-5 sm:px-10 p-8 grid grid-cols-[1fr] revealCard1 gap-6 ">
                <div className="flex items-center justify-center flex-col gap-4">
                    <h1 className="text-center text-4xl"> {result}</h1>
                    <div className="flex items-center justify-center gap-4">
                        <svg
                            fill="#c9901c"
                            strokeWidth={1}
                            stroke="#c9901c"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                            />
                        </svg>
                        <h2 className="text-xl">{streak}</h2>
                    </div>
                </div>
                <div className="flex items-center sm:justify-around justify-center gap-8 w-full *:px-4 *:py-2 *:rounded-md *:w-full md:*:text-2xl sm:*:text-lg *:text-sm ">
                    <button
                        onClick={restartGame}
                        className="hover:bg-zinc-400  bg-zinc-500 transition-all duration-300"
                    >
                        Play Again
                    </button>

                    <button className="hover:bg-blue-400 bg-blue-500 transition-all duration-300 whitespace-nowrap ">
                        <Link href="/pages/leaderboard">LeaderBoard</Link>
                    </button>

                    <button className="hover:bg-blue-400 bg-blue-500 transition-all duration-300 whitespace-nowrap ">
                        <Link href={GAMEMODES[0].link}>Next Game</Link>
                    </button>
                </div>
            </section>
        </main>
    );
}
