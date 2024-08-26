import Bg from '@/app/components/Bg';
import Footer from '@/app/components/Footer';
import GetUserName from '@/app/components/GetUserName';
import React from 'react';

export default function BlurPokemon() {
    return (
        <div>
            <Bg />
            <GetUserName />
            <main></main>
            <Footer />
        </div>
    );
}
