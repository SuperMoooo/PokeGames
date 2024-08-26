'use client';
import { readDataFromDB } from '@/app/actions/databaseActions';
import Bg from '@/app/components/Bg';
import Footer from '@/app/components/Footer';
import GetUserName from '@/app/components/GetUserName';
import GoBack from '@/app/components/GoBack';
import React, { useEffect, useState } from 'react';

export default function LeaderBoard() {
    const [leaderboardData, setLeaderboardData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const getDataDB = async () => {
            try {
                setLoading(true);
                const data = await readDataFromDB();

                setLeaderboardData(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        getDataDB();
    }, []);

    return (
        <div className="grid grid-rows-[auto_1fr_auto] w-full min-h-[100dvh] gap-6 p-6">
            <Bg />
            <GetUserName />
            <GoBack resetBtn={false} resetGame={() => null} />
            <main className="flex items-center flex-col justify-start w-full h-full z-30 mt-10">
                <section className="w-1/2 gap-10 flex items-center justify-center flex-col">
                    <header className="flex items-center justify-center w-full  gap-6">
                        <h1 className="font-thin text-2xl w-12">Nº</h1>
                        <h1 className="text-4xl flex-1">Name </h1>
                        <picture className="w-12 text-center">
                            <svg
                                fill="#c9901c"
                                strokeWidth={1}
                                stroke="#c9901c"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
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
                        </picture>
                    </header>
                    {loading && (
                        <div className="flex items-center justify-center w-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    )}
                    {leaderboardData.map((data: any, index: number) => {
                        let color = '#71717a';
                        switch (index + 1) {
                            case 1:
                                color = '#efbf04';
                                break;
                            case 2:
                                color = '#c4c4c4';
                                break;
                            case 3:
                                color = '#ce8946';
                                break;
                        }

                        return (
                            <section
                                key={data._id}
                                className="flex items-center justify-center w-full gap-6 border-b border-zinc-500 py-1"
                            >
                                <h1 className={`text-2xl w-12 text-[${color}]`}>
                                    {index + 1}
                                </h1>
                                <h1 className="text-2xl flex-1">{data.name}</h1>
                                <h1 className="w-12 text-center text-xl font-bold">
                                    {data.streak}
                                </h1>
                            </section>
                        );
                    })}
                </section>
            </main>
            <Footer />
        </div>
    );
}
