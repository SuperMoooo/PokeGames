import React from 'react';
import { useSelector } from 'react-redux';
import { CATEGORIES_POKEGUESS } from '@/app/lib/constants';
import PokeRow from './PokeRow';

export default function SubmitRow() {
    const rowsPokemon = useSelector(
        (state: any) => state.rowsPokemon.data || []
    );

    return (
        <section className="flex md:items-center items-start justify-end h-full gap-4 flex-col overflow-x-scroll md:overflow-x-hidden overflow-y-hidden">
            <ul className="flex items-center justify-center gap-4 *:text-center *:w-32 *:font-bold *:border-b-2 *:pb-2">
                {CATEGORIES_POKEGUESS.map((category, index) => (
                    <li key={category + '-' + index}>{category}</li>
                ))}
            </ul>

            <div className="flex items-center justify-end h-full gap-4 flex-col-reverse  ">
                {rowsPokemon.map((row: any, index: number) => {
                    return (
                        <PokeRow key={row[1].name + '-' + index} row={row} />
                    );
                })}
            </div>
        </section>
    );
}
