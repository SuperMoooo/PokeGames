import { PokeCardType } from '@/app/lib/constants';
import React from 'react';
import PokeCardUI from '@/app/components/StrongerOrWeaker/PokeCard';

interface SecondCardProps {
    unknownPokemoData: PokeCardType;
    showAttack: boolean;
}

export default function SecondCard({
    unknownPokemoData,
    showAttack,
}: SecondCardProps) {
    return (
        <>
            <PokeCardUI
                data={unknownPokemoData}
                card={2}
                animation={2}
                showAttack={showAttack}
            />
        </>
    );
}
