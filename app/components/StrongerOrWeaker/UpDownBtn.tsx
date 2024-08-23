import React from 'react';

interface UpDownBtnProps {
    disableBtn: boolean;
    handleClick: (value: number) => void;
    streak: number;
}

export default function UpDownBtn({
    disableBtn,
    handleClick,
    streak,
}: UpDownBtnProps) {
    return (
        <section className="flex flex-col items-center justify-center gap-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center justify-center gap-6 *:rounded-full *:bg-zinc-900 *:px-4 *:py-2 *:transition-all *:duration-300 *:grid *:grid-cols-[auto_auto] *:justify-between  *:gap-4 *:w-72 *:text-2xl  *:uppercase">
                <button
                    className={` ${
                        disableBtn
                            ? 'opacity-50'
                            : 'hover:scale-110 cursor-pointer'
                    }`}
                    disabled={disableBtn}
                    onClick={() => handleClick(1)}
                >
                    <h1 className="text-green-600 ">Stronger</h1>
                    <svg
                        fill="#16a34a"
                        strokeWidth={1}
                        stroke="#16a34a"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 15.75 7.5-7.5 7.5 7.5"
                        />
                    </svg>
                </button>
                <button
                    className={` ${
                        disableBtn
                            ? 'opacity-50'
                            : 'hover:scale-110 cursor-pointer'
                    }`}
                    disabled={disableBtn}
                    onClick={() => handleClick(2)}
                >
                    <h1 className="text-[#5c5c5c]">Same</h1>

                    <svg
                        fill="#5c5c5c"
                        strokeWidth={1}
                        stroke="#5c5c5c"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 9h16.5m-16.5 6.75h16.5"
                        />
                    </svg>
                </button>
                <button
                    className={` ${
                        disableBtn
                            ? 'opacity-50'
                            : 'hover:scale-110 cursor-pointer'
                    }`}
                    disabled={disableBtn}
                    onClick={() => handleClick(0)}
                >
                    <h1 className="text-red-600">Weaker</h1>
                    <svg
                        fill="#dc2626"
                        strokeWidth={1}
                        stroke="#dc2626"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                </button>
            </div>
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
            <h4 className="text-zinc-500">
                *Base stat from the latest Pokémon Games
            </h4>
        </section>
    );
}
