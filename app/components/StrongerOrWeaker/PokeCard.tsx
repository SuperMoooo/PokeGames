import { PokeCardType } from '@/app/lib/constants';
import { firstCharToUpperCase } from '@/app/lib/hooks';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface CardProps {
    data: PokeCardType;
    card: number;
    showAttack?: boolean;
}

export default function PokeCard({ data, card, showAttack }: CardProps) {
    //STATES

    const [currentAttack, setCurrentAttack] = useState(0);
    //EFFECTS
    useEffect(() => {
        if (showAttack) {
            let start = 0;
            const end = data.attack;
            const duration = 3000;
            const stepTime = Math.abs(Math.floor(duration / end)); // Time between each increment
            const timer = setInterval(() => {
                start += 1;
                setCurrentAttack(start);
                if (start === end) {
                    clearInterval(timer); // Stop the timer when we reach the target value
                }
            }, stepTime);
            return () => clearInterval(timer); // Cleanup the timer on component unmount
        }
    }, [showAttack, data.attack]);

    return (
        <div className="grid grid-rows-[1fr_auto] gap-4 sm:p-6 w-full h-full ">
            <picture className="w-full items-center justify-center flex sm:h-full ">
                <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.image}.png`}
                    alt={data.name}
                    width={450}
                    height={450}
                    unoptimized
                    className="lg:w-[28rem] md:w-[17rem] w-[12rem] h-full"
                />
            </picture>
            <div className="flex items-center justify-center flex-col gap-4">
                <h1 className="sm:text-2xl text-md">
                    {firstCharToUpperCase(data.name)}
                </h1>
                <h2 className="sm:text-3xl text-xl">
                    Attack:{' '}
                    <span className="font-bold">
                        {card === 0
                            ? data.attack
                            : card > 0 && !showAttack
                            ? '???'
                            : currentAttack}
                    </span>
                </h2>
            </div>
        </div>
    );
}
