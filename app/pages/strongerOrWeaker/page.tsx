'use client';
import Bg from '@/app/components/Bg';
import Footer from '@/app/components/Footer';
import GoBack from '@/app/components/GoBack';
import Loading from '@/app/components/Loading';
import React, { useState } from 'react';

export default function StrongerOrWeaker() {
    const [loading, setLoading] = useState<boolean>(false);
    if (loading) {
        return <Loading />;
    }
    return (
        <div className="grid grid-rows-[auto_1fr_auto] justify-center w-full min-h-[100dvh] p-6">
            <Bg />
            <GoBack resetBtn={false} resetGame={() => null} />
            <main className="z-20"></main>
            <Footer />
        </div>
    );
}
