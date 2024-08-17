import Image from 'next/image';
import React from 'react';
import { firstCharToUpperCase } from '../lib/hooks';

interface RowsProps {
    rows: any[];
}

export default function SubmitRow({ rows }: RowsProps) {
    return (
        <section className="flex md:items-center items-start justify-end h-full gap-4 flex-col overflow-x-scroll md:overflow-x-hidden overflow-y-hidden">
            <ul className="flex items-center justify-center gap-4 *:text-center *:w-32 *:font-bold *:border-b-2 *:pb-2">
                <li>Image</li>
                <li>Name</li>
                <li>Type 1</li>
                <li>Type 2</li>
                <li>Color</li>
                <li>Habitat</li>
            </ul>
            <div className="flex items-center justify-end h-full gap-4 flex-col-reverse  ">
                {rows.map((row, index) => {
                    return (
                        <div
                            key={index}
                            className="flex items-center justify-center gap-4 *:text-xl *:border-4 *:rounded-lg *:border-black  *:w-32 *:h-32 *:flex *:justify-center *:items-center *:opacity-0 *:text-center"
                        >
                            <picture
                                title={row[1].name}
                                className="revealCard1 pokedexBorder relative w-full h-full "
                            >
                                <Image
                                    src={row[0].img}
                                    alt={row[1].name}
                                    width={100}
                                    height={100}
                                />
                            </picture>
                            <div
                                className={`revealCard2 ${
                                    row[1].value === 'green'
                                        ? 'bg-green-600'
                                        : 'bg-red-600'
                                }`}
                            >
                                <h1>{firstCharToUpperCase(row[1].name)}</h1>
                            </div>
                            <div
                                className={`revealCard3 ${
                                    row[2].value === 'green'
                                        ? 'bg-green-600'
                                        : 'bg-red-600'
                                }`}
                            >
                                <h1>{firstCharToUpperCase(row[2].type1)}</h1>
                            </div>
                            <div
                                className={`revealCard4 ${
                                    row[3]?.value === 'green'
                                        ? 'bg-green-600'
                                        : 'bg-red-600'
                                }`}
                            >
                                <h1>
                                    {row[3]?.type2
                                        ? firstCharToUpperCase(row[3]?.type2)
                                        : 'None'}
                                </h1>
                            </div>
                            <div
                                className={`revealCard5 ${
                                    row[4].value === 'green'
                                        ? 'bg-green-600'
                                        : 'bg-red-600'
                                }`}
                            >
                                <h1>{firstCharToUpperCase(row[4].color)}</h1>
                            </div>
                            <div
                                className={`revealCard6  ${
                                    row[5].value === 'green'
                                        ? 'bg-green-600'
                                        : 'bg-red-600'
                                }`}
                            >
                                <h1>{firstCharToUpperCase(row[5].habitat)}</h1>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
