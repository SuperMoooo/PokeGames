import Link from 'next/link';
import React from 'react';

interface GoBackProps {
    resetBtn: boolean;
    resetGame: () => void;
}

export default function GoBack({ resetBtn, resetGame }: GoBackProps) {
    return (
        <div className="w-full flex items-center justify-center z-20 gap-6 *:whitespace-nowrap">
            <button className="bg-zinc-600 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-zinc-500 transition-colors duration-300">
                <Link href="/" className="flex items-center gap-2">
                    <svg
                        fill="none"
                        strokeWidth={1}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                        />
                    </svg>
                    GO BACK
                </Link>
            </button>
            {resetBtn && (
                <button
                    onClick={resetGame}
                    className="bg-zinc-600 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-zinc-500 transition-colors duration-300"
                >
                    RESET GAME
                </button>
            )}
        </div>
    );
}
