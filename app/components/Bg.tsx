import Image from 'next/image';
import React from 'react';
import bg from '../../public/bg2.png';
export default function Bg() {
    return (
        <div className="fixed top-0 left-0 w-full h-full">
            <div className="w-full h-full bg-black/80 absolute z-[10]"></div>

            <picture className="w-full h-full absolute z--10">
                <Image src={bg} alt="Background" fill objectFit="cover" />
            </picture>
        </div>
    );
}
