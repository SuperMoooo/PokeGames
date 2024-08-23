import PokeCard from '@/app/components/StrongerOrWeaker/PokeCard';
import { PokeCardType } from '@/app/lib/constants';
import React from 'react';

interface FirstCardProps {
    pokemonData: PokeCardType;
}

export default function FirstCard({ pokemonData }: FirstCardProps) {
    return (
        <>
            <PokeCard data={pokemonData} card={1} animation={1} />
        </>
    );
}
